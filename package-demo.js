/**
 * Demo Package Builder
 * 
 * This script creates a standalone demo package that can be:
 * - Opened directly in a browser
 * - Deployed to any static hosting service
 * - Shared as a zip file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const DEMO_DIR = path.join(__dirname, 'demo-package');

console.log('📦 Building Command Center BlueIOT Demo Package...\n');

// Step 1: Check if dist exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Error: dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Step 2: Create demo-package directory
if (fs.existsSync(DEMO_DIR)) {
  console.log('🗑️  Cleaning existing demo-package directory...');
  fs.rmSync(DEMO_DIR, { recursive: true, force: true });
}

fs.mkdirSync(DEMO_DIR, { recursive: true });
console.log('✅ Created demo-package directory\n');

// Step 3: Copy dist contents
console.log('📋 Copying build files...');
copyDirectory(DIST_DIR, DEMO_DIR);
console.log('✅ Build files copied\n');

// Step 4: Copy documentation
console.log('📄 Copying documentation...');
const docs = [
  { src: 'DEMO_README.md', dest: 'README.md' },
  { src: 'FEATURES.md', dest: 'FEATURES.md' }
];

docs.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, src);
  const destPath = path.join(DEMO_DIR, dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ ${src} → ${dest}`);
  } else {
    console.warn(`  ⚠️  ${src} not found, skipping`);
  }
});

console.log('✅ Documentation copied\n');

// Step 5: Create package info file
console.log('📝 Creating package info...');
const packageInfo = {
  name: 'Command Center BlueIOT Demo',
  version: '1.0.0',
  type: 'Standalone Frontend Demo',
  description: 'Interactive 3D digital twin dashboard with simulated real-time tracking',
  features: [
    '3D Floor Plan Visualization',
    'Real-Time Entity Tracking',
    'Occupancy Analytics',
    'Alert Management',
    'Historical Playback',
    'Analytics Dashboard'
  ],
  requirements: {
    browser: 'Chrome 90+, Firefox 88+, Safari 14+, Edge 90+',
    display: '1920x1080 minimum',
    internet: 'Not required (all assets embedded)'
  },
  quickStart: [
    'Extract the demo package',
    'Open index.html in a web browser',
    'Dashboard loads automatically with simulated data'
  ],
  buildDate: new Date().toISOString(),
  technicalStack: {
    frontend: 'React 19 with TypeScript',
    rendering: 'Three.js with React Three Fiber',
    state: 'Zustand',
    styling: 'Tailwind CSS',
    charts: 'Recharts',
    build: 'Vite'
  }
};

fs.writeFileSync(
  path.join(DEMO_DIR, 'package-info.json'),
  JSON.stringify(packageInfo, null, 2)
);
console.log('✅ Package info created\n');

// Step 6: Generate deployment instructions
console.log('📋 Generating deployment instructions...');
const deployInstructions = `# Deployment Instructions

## Quick Deploy Options

### 1. Netlify
\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy from demo-package directory
cd demo-package
netlify deploy --prod
\`\`\`

### 2. Vercel
\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy from demo-package directory
cd demo-package
vercel --prod
\`\`\`

### 3. GitHub Pages
\`\`\`bash
# Push demo-package contents to gh-pages branch
git subtree push --prefix demo-package origin gh-pages
\`\`\`

### 4. AWS S3
\`\`\`bash
# Upload to S3 bucket
aws s3 sync demo-package/ s3://your-bucket-name/ --acl public-read
\`\`\`

### 5. Azure Static Web Apps
\`\`\`bash
# Install Azure CLI
az login

# Create static web app
az staticwebapp create \\
  --name command-center-demo \\
  --resource-group your-resource-group \\
  --source demo-package \\
  --location "East US"
\`\`\`

### 6. Local Web Server
\`\`\`bash
# Python
python -m http.server 8000

# Node.js
npx serve demo-package

# PHP
php -S localhost:8000
\`\`\`

## File Structure

\`\`\`
demo-package/
├── index.html              # Main entry point
├── assets/
│   ├── index-*.js         # Application bundle
│   └── index-*.css        # Styles
├── README.md              # User documentation
├── FEATURES.md            # Feature list
├── package-info.json      # Package metadata
└── DEPLOYMENT.md          # This file
\`\`\`

## Requirements

- No server-side processing required
- All assets are static files
- HTTPS recommended but not required
- CORS not an issue (no external API calls)

## Performance Tips

1. **Enable Gzip Compression**: Configure your web server to compress assets
2. **Set Cache Headers**: Cache static assets for better performance
3. **Use CDN**: Distribute assets via CDN for global access
4. **Enable HTTP/2**: Improves loading performance

## Security Considerations

- This is a demo with simulated data only
- No sensitive information is transmitted
- No backend authentication required
- Safe to deploy on public URLs

## Troubleshooting

### Assets Not Loading
- Ensure all files in assets/ directory are uploaded
- Check file permissions (should be readable)
- Verify MIME types are set correctly

### 3D View Not Rendering
- Ensure WebGL is enabled in browser
- Check browser console for errors
- Verify GPU acceleration is available

### Slow Performance
- Use a CDN for faster asset delivery
- Enable compression on web server
- Ensure client has adequate GPU

## Support

For issues or questions:
1. Check README.md for usage instructions
2. Review FEATURES.md for capability details
3. Contact your technical representative
`;

fs.writeFileSync(
  path.join(DEMO_DIR, 'DEPLOYMENT.md'),
  deployInstructions
);
console.log('✅ Deployment instructions created\n');

// Step 7: Calculate package size
console.log('📊 Package Statistics:');
const stats = getDirectoryStats(DEMO_DIR);
console.log(`  Total Files: ${stats.fileCount}`);
console.log(`  Total Size: ${formatBytes(stats.totalSize)}`);
console.log(`  Largest File: ${stats.largestFile.name} (${formatBytes(stats.largestFile.size)})`);
console.log('');

// Step 8: Success message
console.log('✅ Demo package created successfully!\n');
console.log('📁 Location: demo-package/\n');
console.log('🚀 Next Steps:');
console.log('  1. Open demo-package/index.html in a browser to test');
console.log('  2. Review demo-package/README.md for usage instructions');
console.log('  3. Deploy to web server or share as zip file');
console.log('  4. See demo-package/DEPLOYMENT.md for deployment options\n');

// Helper Functions

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getDirectoryStats(dir) {
  let fileCount = 0;
  let totalSize = 0;
  let largestFile = { name: '', size: 0 };

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else {
        fileCount++;
        const stats = fs.statSync(fullPath);
        totalSize += stats.size;

        if (stats.size > largestFile.size) {
          largestFile = {
            name: path.relative(dir, fullPath),
            size: stats.size
          };
        }
      }
    }
  }

  traverse(dir);

  return { fileCount, totalSize, largestFile };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
