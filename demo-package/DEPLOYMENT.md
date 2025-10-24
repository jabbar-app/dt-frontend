# Deployment Instructions

## Quick Deploy Options

### 1. Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy from demo-package directory
cd demo-package
netlify deploy --prod
```

### 2. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from demo-package directory
cd demo-package
vercel --prod
```

### 3. GitHub Pages
```bash
# Push demo-package contents to gh-pages branch
git subtree push --prefix demo-package origin gh-pages
```

### 4. AWS S3
```bash
# Upload to S3 bucket
aws s3 sync demo-package/ s3://your-bucket-name/ --acl public-read
```

### 5. Azure Static Web Apps
```bash
# Install Azure CLI
az login

# Create static web app
az staticwebapp create \
  --name command-center-demo \
  --resource-group your-resource-group \
  --source demo-package \
  --location "East US"
```

### 6. Local Web Server
```bash
# Python
python -m http.server 8000

# Node.js
npx serve demo-package

# PHP
php -S localhost:8000
```

## File Structure

```
demo-package/
├── index.html              # Main entry point
├── assets/
│   ├── index-*.js         # Application bundle
│   └── index-*.css        # Styles
├── README.md              # User documentation
├── FEATURES.md            # Feature list
├── package-info.json      # Package metadata
└── DEPLOYMENT.md          # This file
```

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
