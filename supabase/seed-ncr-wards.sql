-- Insert default Constituencies for NCR
INSERT INTO constituencies (id, constituency_name, state) VALUES
  ('d3f6274c-9fa2-457c-9443-367de2669aa2', 'Faridabad', 'Haryana'),
  ('a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c', 'Gurugram', 'Haryana'),
  ('f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2', 'New Delhi', 'Delhi')
ON CONFLICT (constituency_name) DO NOTHING;

-- Insert Static Ward Data for Faridabad (Mapped to Sectors/Villages)
INSERT INTO wards (id, ward_name, ward_number, state, city, area_or_sector, village, constituency_id) VALUES
  (gen_random_uuid(), 'Faridabad Ward 30', '30', 'Haryana', 'Faridabad', 'Sector 9', NULL, 'd3f6274c-9fa2-457c-9443-367de2669aa2'),
  (gen_random_uuid(), 'Faridabad Ward 28', '28', 'Haryana', 'Faridabad', 'Sector 15', NULL, 'd3f6274c-9fa2-457c-9443-367de2669aa2'),
  (gen_random_uuid(), 'Faridabad Ward 21', '21', 'Haryana', 'Faridabad', 'Sector 21', NULL, 'd3f6274c-9fa2-457c-9443-367de2669aa2'),
  (gen_random_uuid(), 'Faridabad Ward 39', '39', 'Haryana', 'Faridabad', 'Sector 55', NULL, 'd3f6274c-9fa2-457c-9443-367de2669aa2'),
  (gen_random_uuid(), 'Faridabad Ward 40', '40', 'Haryana', 'Faridabad', 'Ballabgarh', 'Ballabgarh Village', 'd3f6274c-9fa2-457c-9443-367de2669aa2'),
  (gen_random_uuid(), 'Faridabad Ward 10', '10', 'Haryana', 'Faridabad', 'NIT 1', NULL, 'd3f6274c-9fa2-457c-9443-367de2669aa2'),
  (gen_random_uuid(), 'Faridabad Ward 32', '32', 'Haryana', 'Faridabad', 'Sector 29', NULL, 'd3f6274c-9fa2-457c-9443-367de2669aa2')
ON CONFLICT (ward_name) DO NOTHING;

-- Insert Static Ward Data for Gurugram
INSERT INTO wards (id, ward_name, ward_number, state, city, area_or_sector, village, constituency_id) VALUES
  (gen_random_uuid(), 'Gurugram Ward 30', '30', 'Haryana', 'Gurugram', 'Sector 56', NULL, 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c'),
  (gen_random_uuid(), 'Gurugram Ward 34', '34', 'Haryana', 'Gurugram', 'DLF Cyber City', 'Nathupur', 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c')
ON CONFLICT (ward_name) DO NOTHING;

-- Insert Static Ward Data for New Delhi
INSERT INTO wards (id, ward_name, ward_number, state, city, area_or_sector, village, constituency_id) VALUES
  (gen_random_uuid(), 'Delhi Ward 120', '120', 'Delhi', 'New Delhi', 'Dwarka', 'Palam', 'f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2'),
  (gen_random_uuid(), 'Delhi Ward 50', '50', 'Delhi', 'New Delhi', 'Rohini', NULL, 'f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2'),
  (gen_random_uuid(), 'Delhi Ward 58', '58', 'Delhi', 'New Delhi', 'Connaught Place', NULL, 'f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2')
ON CONFLICT (ward_name) DO NOTHING;
