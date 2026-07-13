import { createClient } from 'npm:@supabase/supabase-js@2';

const supabaseUrl = "https://lhowwphqgysisscfhfoe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxob3d3cGhxZ3lzaXNzY2ZoZm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0OTI4MDksImV4cCI6MjA5OTA2ODgwOX0.f02QF23yLaWDP3VWUlLFoKMlZSDmmjHxMrdhGR6LdL8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log("Seeding constituencies...");
  const constituencies = [
    { id: 'd3f6274c-9fa2-457c-9443-367de2669aa2', constituency_name: 'Faridabad', state: 'Haryana' },
    { id: 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c', constituency_name: 'Gurugram', state: 'Haryana' },
    { id: 'f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2', constituency_name: 'New Delhi', state: 'Delhi' }
  ];
  for (const c of constituencies) {
    await supabase.from('constituencies').upsert(c, { onConflict: 'constituency_name' });
  }

  console.log("Seeding wards...");
  const wards = [
    { ward_name: 'Faridabad Ward 30', ward_number: '30', state: 'Haryana', city: 'Faridabad', area_or_sector: 'Sector 9', constituency_id: 'd3f6274c-9fa2-457c-9443-367de2669aa2' },
    { ward_name: 'Faridabad Ward 28', ward_number: '28', state: 'Haryana', city: 'Faridabad', area_or_sector: 'Sector 15', constituency_id: 'd3f6274c-9fa2-457c-9443-367de2669aa2' },
    { ward_name: 'Faridabad Ward 21', ward_number: '21', state: 'Haryana', city: 'Faridabad', area_or_sector: 'Sector 21', constituency_id: 'd3f6274c-9fa2-457c-9443-367de2669aa2' },
    { ward_name: 'Faridabad Ward 39', ward_number: '39', state: 'Haryana', city: 'Faridabad', area_or_sector: 'Sector 55', constituency_id: 'd3f6274c-9fa2-457c-9443-367de2669aa2' },
    { ward_name: 'Faridabad Ward 40', ward_number: '40', state: 'Haryana', city: 'Faridabad', area_or_sector: 'Ballabgarh', village: 'Ballabgarh Village', constituency_id: 'd3f6274c-9fa2-457c-9443-367de2669aa2' },
    { ward_name: 'Faridabad Ward 10', ward_number: '10', state: 'Haryana', city: 'Faridabad', area_or_sector: 'NIT 1', constituency_id: 'd3f6274c-9fa2-457c-9443-367de2669aa2' },
    { ward_name: 'Faridabad Ward 32', ward_number: '32', state: 'Haryana', city: 'Faridabad', area_or_sector: 'Sector 29', constituency_id: 'd3f6274c-9fa2-457c-9443-367de2669aa2' },
    { ward_name: 'Gurugram Ward 30', ward_number: '30', state: 'Haryana', city: 'Gurugram', area_or_sector: 'Sector 56', constituency_id: 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c' },
    { ward_name: 'Gurugram Ward 34', ward_number: '34', state: 'Haryana', city: 'Gurugram', area_or_sector: 'DLF Cyber City', village: 'Nathupur', constituency_id: 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c' },
    { ward_name: 'Delhi Ward 120', ward_number: '120', state: 'Delhi', city: 'New Delhi', area_or_sector: 'Dwarka', village: 'Palam', constituency_id: 'f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2' },
    { ward_name: 'Delhi Ward 50', ward_number: '50', state: 'Delhi', city: 'New Delhi', area_or_sector: 'Rohini', constituency_id: 'f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2' },
    { ward_name: 'Delhi Ward 58', ward_number: '58', state: 'Delhi', city: 'New Delhi', area_or_sector: 'Connaught Place', constituency_id: 'f7e8d9c0-b1a2-43d4-e5f6-a7b8c9d0e1f2' }
  ];
  
  for (const w of wards) {
    const { error } = await supabase.from('wards').upsert(w, { onConflict: 'ward_name' });
    if (error) console.error("Error inserting ward:", error);
  }
  
  console.log("Seeding complete!");
  Deno.exit(0);
}

seed();
