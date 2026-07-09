import pg from 'pg';
const { Client } = pg;

async function seed() {
    const connectionString = 'postgresql://postgres:zHfZEe7j4PDrOMAN@db.lhowwphqgysisscfhfoe.supabase.co:5432/postgres';
    const client = new Client({ connectionString });
    await client.connect();
    console.log('Connected to Supabase database.');

    try {
        console.log('Fetching India parliamentary constituencies GeoJSON...');
        const response = await fetch('https://raw.githubusercontent.com/civictech-India/INDIA-GEO-JSON-Datasets/master/india_pc_2019.json');
        if (!response.ok) throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
        const geojson = await response.json();
        
        console.log('Processing constituencies...');
        const uniquePCs = new Map();
        for (const feature of geojson.features) {
            const props = feature.properties;
            if (props.st_name && props.pc_name) {
                const key = `${props.st_name.trim()}|||${props.pc_name.trim()}`;
                uniquePCs.set(key, {
                    state: props.st_name.trim(),
                    constituency: props.pc_name.trim()
                });
            }
        }
        
        const constituenciesList = Array.from(uniquePCs.values());
        console.log(`Found ${constituenciesList.length} unique constituencies.`);

        // Clear existing constituencies and wards to avoid duplicate key errors
        console.log('Clearing existing wards and constituencies...');
        await client.query('TRUNCATE TABLE wards, constituencies CASCADE');

        // Batch insert constituencies in chunks to avoid parameter limits in pg
        console.log('Inserting constituencies...');
        const insertedConstituencies = [];
        const pcChunkSize = 100;
        
        for (let i = 0; i < constituenciesList.length; i += pcChunkSize) {
            const chunk = constituenciesList.slice(i, i + pcChunkSize);
            const constituencyValues = [];
            const constituencyParams = [];
            let paramIndex = 1;
            
            for (const item of chunk) {
                constituencyValues.push(`($${paramIndex}, $${paramIndex + 1})`);
                constituencyParams.push(item.constituency, item.state);
                paramIndex += 2;
            }

            const insertConstituenciesQuery = `
                INSERT INTO constituencies (constituency_name, state)
                VALUES ${constituencyValues.join(', ')}
                RETURNING id, constituency_name, state
            `;

            const res = await client.query(insertConstituenciesQuery, constituencyParams);
            insertedConstituencies.push(...res.rows);
        }
        
        console.log(`Successfully inserted ${insertedConstituencies.length} constituencies.`);

        // Prepare wards insertion
        console.log('Preparing wards...');
        const wardsList = [];
        let wardNumberCounter = 10001;
        
        for (const pc of insertedConstituencies) {
            for (let i = 1; i <= 5; i++) {
                wardsList.push({
                    ward_name: `${pc.constituency_name} (${pc.state}) Ward ${i}`,
                    ward_number: `WN-${wardNumberCounter++}`,
                    population: Math.floor(Math.random() * 50000) + 10000, // random population between 10k and 60k
                    latitude: 20.5937, // default centered in India
                    longitude: 78.9629,
                    constituency_id: pc.id
                });
            }
        }

        console.log(`Inserting ${wardsList.length} wards in batches...`);
        const batchSize = 100; // 100 rows * 6 parameters = 600 parameters (well within pg limits)
        
        for (let i = 0; i < wardsList.length; i += batchSize) {
            const batch = wardsList.slice(i, i + batchSize);
            const wardValues = [];
            const wardParams = [];
            let wIndex = 1;
            
            for (const ward of batch) {
                wardValues.push(`($${wIndex}, $${wIndex + 1}, $${wIndex + 2}, $${wIndex + 3}, $${wIndex + 4}, $${wIndex + 5})`);
                wardParams.push(
                    ward.ward_name,
                    ward.ward_number,
                    ward.population,
                    ward.latitude,
                    ward.longitude,
                    ward.constituency_id
                );
                wIndex += 6;
            }

            const insertWardsQuery = `
                INSERT INTO wards (ward_name, ward_number, population, latitude, longitude, constituency_id)
                VALUES ${wardValues.join(', ')}
            `;
            await client.query(insertWardsQuery, wardParams);
        }

        console.log(`Successfully inserted ${wardsList.length} wards.`);
        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await client.end();
    }
}

seed();
