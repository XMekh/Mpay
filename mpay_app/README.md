# Mpay App

A modern React TypeScript application with comprehensive CI/CD pipeline for automated deployment.

## 🚀 Features

- React 18 with TypeScript
- Vite build tool for fast development
- Tailwind CSS for styling
- Docker containerization
- Automated CI/CD pipeline
- Nginx production server

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Docker
- Git

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Using Docker (recommended):**
   ```bash
   # Make scripts executable
   chmod +x scripts/*.sh
   
   # Start development environment
   ./scripts/dev.sh
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🐳 Docker

### Production Build

```bash
# Build production image
docker build -t mpay-app:latest .

# Run production container
docker run -d -p 80:80 --name mpay-app mpay-app:latest
```

### Development Build

```bash
# Build development image
docker build -f Dockerfile.dev -t mpay-app:dev .

# Run development container
docker run -d -p 3001:3000 -v $(pwd)/src:/app/src --name mpay-app-dev mpay-app:dev
```

### Using Docker Compose

```bash
# Production
docker-compose up -d

# Development
docker-compose --profile dev up --build
```

## 🚀 Deployment

### Automated CI/CD

The app includes both GitHub Actions and GitLab CI/CD pipelines that:

1. **Test** - Run linting and build tests
2. **Build** - Create Docker image
3. **Push** - Upload to Docker Hub or GitLab Registry
4. **Deploy** - SSH into server and deploy container

### Required Secrets

#### GitHub Actions
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password/token
- `SERVER_HOST` - Target server hostname/IP
- `SERVER_USERNAME` - SSH username
- `SERVER_SSH_KEY` - SSH private key
- `SERVER_PORT` - SSH port (default: 22)

#### GitLab CI
- `CI_REGISTRY_USER` - GitLab registry username
- `CI_REGISTRY_PASSWORD` - GitLab registry password
- `SERVER_HOST` - Target server hostname/IP
- `SERVER_USERNAME` - SSH username
- `SERVER_SSH_KEY` - SSH private key

### Manual Deployment

1. **Set environment variables:**
   ```bash
   export REGISTRY="docker.io"
   export IMAGE_NAME="your-username/mpay-app"
   export SERVER_HOST="your-server.com"
   export SERVER_USER="deploy"
   ```

2. **Run deployment script:**
   ```bash
   ./scripts/deploy.sh
   ```

### Server Requirements

- Docker installed and running
- SSH access with key-based authentication
- Port 80 available for the application

## 📁 Project Structure

```
mpay_app/
├── src/                    # Source code
├── public/                 # Static assets
├── scripts/                # Deployment scripts
│   ├── deploy.sh          # Production deployment
│   └── dev.sh             # Development setup
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Application port (default: 3000 for dev, 80 for production)

### Nginx Configuration

The production build uses Nginx with:
- React Router support
- Gzip compression
- Static asset caching
- Security headers
- Health checks

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build test
npm run build

# Preview production build
npm run preview
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
