const fs = require('fs');
const path = require('path');

// Function to generate navigation from docs directory
function generateNavigation() {
    const docsPath = './docs';
    const sidebarPath = './docs/_sidebar.md';
    
    try {
        // Read all .md files in docs directory
        const files = fs.readdirSync(docsPath)
            .filter(file => file.endsWith('.md') && !file.startsWith('_'))
            .sort();
        
        // Generate navigation content
        let navigationContent = '';
        
        // Add each file as a navigation item
        files.forEach(file => {
            const fileName = file.replace('.md', '');
            
            // Skip README as it's the home page
            if (fileName.toLowerCase() === 'readme') {
                navigationContent += '* [Home](/)\n';
                return;
            }
            
            // Convert filename to title (capitalize and replace hyphens)
            const title = fileName
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            navigationContent += `* [${title}](/${file})\n`;
        });
        
        // Write the navigation file
        fs.writeFileSync(sidebarPath, navigationContent);
        console.log('✅ Navigation updated successfully!');
        console.log('📄 Files found:');
        files.forEach(file => console.log(`   - ${file}`));
        
    } catch (error) {
        console.error('❌ Error generating navigation:', error);
    }
}

// Run the function
generateNavigation();

// Export for use in other scripts
module.exports = generateNavigation;
