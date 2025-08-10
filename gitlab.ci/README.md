# GitLab CI/CD Pipeline for Mpay App

This GitLab CI configuration automatically builds, tests, and deploys the Mpay application using Docker Hub.

## 🚀 Pipeline Stages

1. **Test** - Runs linting and build tests
2. **Build** - Builds Docker image and pushes to Docker Hub
3. **Deploy** - Deploys the application to your server via SSH

## 🔧 Required Environment Variables

Set these variables in your GitLab project's **Settings > CI/CD > Variables**:

### Docker Hub Authentication
✅ **Already configured** in pipeline variables:
- `DOCKER_HUB_USERNAME` = `xmekh`
- `DOCKER_HUB_PASSWORD` = `Xady.Mekh0612`

### Server Deployment
- `SERVER_HOST` - Your server's IP address or domain
- `SERVER_USERNAME` - SSH username for the server
- `SERVER_SSH_KEY` - Private SSH key for server access

## 📋 Variable Setup Instructions

1. Go to your GitLab project
2. Navigate to **Settings > CI/CD > Variables**
3. Add each variable with **Protected** and **Masked** options enabled
4. For `SERVER_SSH_KEY`, paste your entire private SSH key content

## 🔒 Security Notes

- **Docker Hub credentials** are hardcoded in the pipeline (for convenience)
- **Never commit** server credentials to your repository
- Use **Personal Access Tokens** instead of passwords when possible
- Enable **Protected** and **Masked** for sensitive variables
- Rotate credentials regularly

## 🐳 Docker Images

The pipeline builds and pushes to:
- **Repository**: `xmekh/mpay`
- **Tags**: `latest` and commit SHA
- **Registry**: Docker Hub (`docker.io`)

## 🚀 Usage

The pipeline automatically runs on:
- **Main branch** - Full pipeline (test, build, deploy)
- **Develop branch** - Test and build only
- **Merge requests** - Test only

## 📝 Example Deployment

After a successful pipeline run, your app will be available at:
```
http://YOUR_SERVER_IP
```

## 🔍 Troubleshooting

- **Build failures**: Docker Hub credentials are pre-configured
- **Deploy failures**: Verify SSH key and server connectivity
- **Permission issues**: Ensure SSH key has proper permissions on server 