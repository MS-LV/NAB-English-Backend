const path = require('path');

module.exports = {
    entry: './index.js', // Your main entry file
    target: 'node', // Build for Node.js environment
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist') // Output directory
    },
    // Other configuration options, loaders, and plugins as needed
};