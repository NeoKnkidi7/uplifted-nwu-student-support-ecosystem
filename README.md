# Uplifted NWU Student Support Ecosystem

## Development Setup

```bash
# Clone repository
git clone https://github.com/neoknkidi7/uplifted-nwu-student-support-ecosystem.git
cd uplifted-nwu-student-support-ecosystem

# Install dependencies
bun install
```

### Running the App

**Web Development:**
```bash
bun run web
```

**Android Development:**
```bash
expo run:android
```

### Production Deployment

**Web App:**  
Automatically deployed to GitHub Pages:  
[https://neoknkidi7.github.io/uplifted-nwu-student-support-ecosystem/](https://neoknkidi7.github.io/uplifted-nwu-student-support-ecosystem/)

**Android App:**  
Download APK from [Releases](https://github.com/neoknkidi7/uplifted-nwu-student-support-ecosystem/releases)

## Contributing

1. Make your changes
2. Commit and push:
```bash
git add .
git commit -m "Fix deployment: GitHub Pages 404 and Android build"
git push origin main
```
3. Web app will automatically deploy
4. Create new release for Android APK

## Troubleshooting
- Web 404 error: Wait 5 minutes after deployment
- Android build fails: Check workflow logs in Actions tab
