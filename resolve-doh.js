const https = require('https');

const shards = [
    'cluster0-shard-00-00.3xnq29f.mongodb.net',
    'cluster0-shard-00-01.3xnq29f.mongodb.net',
    'cluster0-shard-00-02.3xnq29f.mongodb.net'
];

async function resolveDoH(hostname) {
    return new Promise((resolve, reject) => {
        const url = `https://dns.google/resolve?name=${hostname}&type=A`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.Answer) {
                        const ip = json.Answer[json.Answer.length - 1].data;
                        console.log(`✅ ${hostname} -> ${ip}`);
                        resolve(ip);
                    } else {
                        console.error(`❌ No Answer for ${hostname}`, json);
                        resolve(null);
                    }
                } catch (e) {
                    console.error('Parse error', e);
                    resolve(null);
                }
            });
        }).on('error', err => {
            console.error('Request error', err);
            resolve(null);
        });
    });
}

async function main() {
    console.log('1. Fetching SRV Record to find explicit shard names...');
    const srvUrl = `https://dns.google/resolve?name=_mongodb._tcp.cluster0.sztic6k.mongodb.net&type=SRV`;

    // Helper to get JSON
    const getJson = (url) => new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
            });
        });
    });

    const srvData = await getJson(srvUrl);

    if (!srvData.Answer) {
        console.error('❌ Failed to get SRV record:', srvData);
        return;
    }

    const realShards = srvData.Answer.map(a => {
        // SRV data format: "priority weight port target"
        // Google DNS returns data string like "0 0 27017 cluster0-shard-00-00...."
        const parts = a.data.split(' ');
        return parts[parts.length - 1].replace(/\.$/, ''); // Remove trailing dot
    });

    console.log('✅ Found Shards:', realShards);

    console.log('\n2. Resolving IPs for these shards...');
    for (const shard of realShards) {
        await resolveDoH(shard);
    }
}

main();
