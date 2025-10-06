const fs = require('fs');
const path = require('path');
const generateNavigation = require('./generate-navigation.js');

// Watch the docs directory for changes
const docsPath = './docs';
let lastUpdate = Date.now();

console.log('🔍 Watching docs directory for changes...');
console.log('💡 Navigation will auto-update when files are added/removed');

// Watch for any changes in the docs directory
fs.watch(docsPath, { recursive: false }, (eventType, filename) => {
    const now = Date.now();
    
    // Prevent duplicate rapid fire events
    if (now - lastUpdate < 2000) return;
    
    if (filename && filename.endsWith('.md') && !filename.startsWith('_')) {
        console.log(`📝 File change detected: ${filename} (${eventType})`);
        console.log('🔄 Updating navigation...');
        
        lastUpdate = now;
        
        // Delay to ensure CMS file operation is complete
        setTimeout(() => {
            generateNavigation();
            console.log('✅ Navigation auto-updated successfully!');
        }, 1500);
    }
});

// Also watch for any file system changes (covers CMS operations)
setInterval(() => {
    const files = fs.readdirSync(docsPath)
        .filter(file => file.endsWith('.md') && !file.startsWith('_'))
        .sort();
    
    // Store previous state to detect changes
    if (!fs.existsSync('.nav-cache')) {
        fs.writeFileSync('.nav-cache', JSON.stringify(files));
    }
    
    const previousFiles = JSON.parse(fs.readFileSync('.nav-cache', 'utf8'));
    
    if (JSON.stringify(files) !== JSON.stringify(previousFiles)) {
        console.log('📂 File structure change detected via polling');
        console.log('🔄 Updating navigation...');
        
        generateNavigation();
        fs.writeFileSync('.nav-cache', JSON.stringify(files));
        console.log('✅ Navigation auto-updated successfully!');
    }
}, 3000); // Check every 3 seconds

// Keep the process running
process.on('SIGINT', () => {
    console.log('\n👋 File watcher stopped');
    process.exit(0);
});
