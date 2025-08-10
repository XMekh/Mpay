# Ansible Server Provisioning for Mpay App

This Ansible configuration automatically provisions a VM instance with Docker, Git, and proper firewall configuration for deploying the Mpay application.

## 🚀 Features

- **Automated Server Setup**: Complete server provisioning from scratch
- **Docker Installation**: Latest Docker CE with Docker Compose
- **Security Hardening**: UFW firewall with only necessary ports (22, 80, 443)
- **Deployment Ready**: Pre-configured deployment environment
- **Multi-Cloud Support**: Works with AWS, GCP, Azure, DigitalOcean, etc.

## 📋 Prerequisites

- Ansible 2.9+ installed on your local machine
- SSH access to the target server
- SSH key pair for authentication
- Target server running Ubuntu 20.04+ or similar

## 🛠️ Installation

### 1. Install Ansible

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ansible

# macOS
brew install ansible

# CentOS/RHEL
sudo yum install ansible
```

### 2. Clone this repository

```bash
git clone <your-repo>
cd ansible
```

## ⚙️ Configuration

### 1. Update Inventory

Edit `inventory.yml` with your server details:

```yaml
all:
  children:
    webservers:
      hosts:
        mpay-server:
          ansible_host: YOUR_SERVER_IP
          ansible_user: ubuntu  # or your cloud provider's default user
          ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

### 2. Set Environment Variables (Optional)

```bash
export DOCKER_REGISTRY="docker.io"
export DOCKER_IMAGE_NAME="your-username/mpay-app"
```

## 🚀 Usage

### Run the Complete Playbook

```bash
# Test the connection first
ansible webservers -m ping

# Run the complete provisioning
ansible-playbook playbook.yml

# Run with verbose output
ansible-playbook playbook.yml -v

# Run with extra variables
ansible-playbook playbook.yml -e "registry=myregistry.com image_name=myapp"
```

### Run Individual Roles

```bash
# Only install common packages
ansible-playbook playbook.yml --tags common

# Only install Docker
ansible-playbook playbook.yml --tags docker

# Only configure firewall
ansible-playbook playbook.yml --tags firewall

# Only setup deployment
ansible-playbook playbook.yml --tags deploy
```

## 🏗️ What Gets Installed

### Common Role
- Essential system packages (curl, wget, git, vim, htop)
- Timezone configuration
- Deploy user creation with sudo access
- SSH key setup

### Docker Role
- Docker CE (latest)
- Docker Compose
- Docker Buildx
- Proper user group configuration
- Docker daemon optimization

### Firewall Role
- UFW firewall
- Only ports 22 (SSH), 80 (HTTP), 443 (HTTPS) open
- Deny all other incoming connections
- Allow all outgoing connections

### Deploy Role
- Application directory structure
- Docker Compose configuration
- Systemd service for auto-start
- Log rotation setup
- Deployment script

## 🔒 Security Features

- **Firewall**: Only necessary ports open (22, 80, 443)
- **User Isolation**: Dedicated deploy user with limited privileges
- **SSH Key Authentication**: No password authentication
- **Docker Security**: Non-root user access to Docker
- **Log Rotation**: Prevents disk space issues

## 🌐 Cloud Provider Support

### AWS EC2
```yaml
ansible_user: ubuntu  # or ec2-user for Amazon Linux
ansible_host: YOUR_EC2_PUBLIC_IP
```

### Google Cloud Platform
```yaml
ansible_user: ubuntu
ansible_host: YOUR_GCP_EXTERNAL_IP
```

### Azure
```yaml
ansible_user: azureuser
ansible_host: YOUR_AZURE_PUBLIC_IP
```

### DigitalOcean
```yaml
ansible_user: root
ansible_host: YOUR_DROPLET_IP
```

## 📊 Monitoring

### Check Service Status

```bash
# Check Docker status
sudo systemctl status docker

# Check Mpay app service
sudo systemctl status mpay-app

# Check firewall status
sudo ufw status verbose
```

### View Logs

```bash
# Docker logs
sudo docker logs mpay-app

# Application logs
sudo tail -f /var/log/mpay-app/*.log

# System logs
sudo journalctl -u mpay-app -f
```

## 🔧 Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify SSH key permissions: `chmod 600 ~/.ssh/id_rsa`
   - Check server security groups allow port 22
   - Verify username matches cloud provider default

2. **Docker Installation Failed**
   - Ensure server has internet access
   - Check Ubuntu version compatibility
   - Verify GPG key import

3. **Firewall Issues**
   - Check UFW status: `sudo ufw status`
   - Verify rules: `sudo ufw show added`
   - Reset if needed: `sudo ufw reset`

### Debug Mode

```bash
# Run with maximum verbosity
ansible-playbook playbook.yml -vvvv

# Check facts
ansible webservers -m setup

# Test specific task
ansible webservers -m shell -a "docker --version"
```

## 📝 Customization

### Modify Package Lists

Edit `roles/common/tasks/main.yml` to add/remove packages:

```yaml
- name: Install essential packages
  apt:
    name:
      - curl
      - wget
      - your-custom-package
    state: present
```

### Add Custom Services

Edit `roles/deploy/tasks/main.yml` to add additional services:

```yaml
- name: Create custom service
  copy:
    dest: /etc/systemd/system/custom.service
    content: |
      [Unit]
      Description=Custom Service
      # ... your service configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `ansible-playbook --check`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review Ansible logs
3. Open an issue in the repository 