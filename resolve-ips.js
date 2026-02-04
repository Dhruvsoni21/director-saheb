const dns = require('dns');

// Force usage of Google DNS to bypass local ISP/System DNS issues
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log('✅ Configured to use Google DNS (8.8.8.8)');
} catch (e) {
    console.error('⚠️ Could not set custom DNS servers:', e.message);
}

const shards = [
    'cluster0-shard-00-00.3xnq29f.mongodb.net',
    'cluster0-shard-00-01.3xnq29f.mongodb.net',
    'cluster0-shard-00-02.3xnq29f.mongodb.net'
];

console.log('Resolving IPs for Mumbai Cluster...');

shards.forEach(host => {
    dns.resolve4(host, (err, addresses) => {
        if (err) {
            console.error(`❌ Failed ${host}: ${err.code}`);
        } else {
            console.log(`✅ ${host} => ${addresses.join(', ')}`);
        }
    });
});
