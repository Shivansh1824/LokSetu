-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Wards Table
CREATE TABLE wards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ward_name VARCHAR(100) UNIQUE NOT NULL,
    ward_number VARCHAR(20) UNIQUE NOT NULL,
    population INTEGER NOT NULL CHECK (population > 0),
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    boundary_geojson JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Profiles Table (For role governance)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'Citizen' CHECK (role IN ('MP', 'Staff', 'Officer', 'Citizen')),
    assigned_ward_id UUID REFERENCES wards(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Citizens Table
CREATE TABLE citizens (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    ward_id UUID REFERENCES wards(id) ON DELETE SET NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Development Works (Sanctions) Table
CREATE TABLE development_works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_title VARCHAR(200) NOT NULL,
    description TEXT,
    ward_id UUID NOT NULL REFERENCES wards(id) ON DELETE RESTRICT,
    sanctioned_budget DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    spent_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    assigned_department VARCHAR(100) NOT NULL,
    officer_in_charge VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Sanctioned' CHECK (status IN ('Sanctioned', 'Tendering', 'Under Construction', 'Completed', 'Cancelled')),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    start_date DATE,
    completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create Complaints Table
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID REFERENCES citizens(id) ON DELETE SET NULL,
    raw_citizen_name VARCHAR(100),
    raw_citizen_contact VARCHAR(100),
    raw_text TEXT NOT NULL,
    extracted_title VARCHAR(200),
    category VARCHAR(100),
    urgency_score INTEGER CHECK (urgency_score BETWEEN 1 AND 5),
    sentiment VARCHAR(50),
    ward_id UUID REFERENCES wards(id) ON DELETE SET NULL,
    development_work_id UUID REFERENCES development_works(id) ON DELETE SET NULL,
    source VARCHAR(50) DEFAULT 'Portal',
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Sanctioned', 'Rejected', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Automated Trigger Logic
-- Automatically transitions associated citizen complaints to 'Resolved' when the MP project status becomes 'Completed'
CREATE OR REPLACE FUNCTION resolve_linked_complaints()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Completed' AND OLD.status != 'Completed' THEN
        UPDATE complaints
        SET status = 'Resolved', updated_at = CURRENT_TIMESTAMP
        WHERE development_work_id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_resolve_complaints
AFTER UPDATE ON development_works
FOR EACH ROW
EXECUTE FUNCTION resolve_linked_complaints();

-- 8. Performance Indexes
CREATE INDEX idx_complaints_ward ON complaints(ward_id);
CREATE INDEX idx_complaints_work ON complaints(development_work_id);
CREATE INDEX idx_development_ward ON development_works(ward_id);
CREATE INDEX idx_citizens_phone ON citizens(phone_number);

-- 9. Analytical View: Ward Level Priority Aggregations
CREATE VIEW ward_priorities AS
SELECT 
  w.id AS ward_id,
  w.ward_name,
  w.population AS ward_population,
  w.latitude,
  w.longitude,
  COUNT(c.id) AS complaint_count,
  COALESCE(AVG(c.urgency_score), 0)::NUMERIC(3,2) AS avg_urgency_score,
  ROUND(
    COALESCE(
      (AVG(c.urgency_score) * 0.6) + 
      ((COUNT(c.id)::DECIMAL / w.population) * 10000 * 0.4),
      0
    ),
    2
  ) AS priority_score
FROM wards w
LEFT JOIN complaints c ON c.ward_id = w.id
GROUP BY w.id, w.ward_name, w.population, w.latitude, w.longitude;
