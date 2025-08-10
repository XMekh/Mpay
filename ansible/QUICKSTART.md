# 🚀 Quick Start Guide

## ⚡ Get Started in 5 Minutes

### 1. **Update Your Server Details**

Edit `inventory.yml` with your actual server information:

```yaml
mpay-server:
  ansible_host: YOUR_ACTUAL_SERVER_IP
  ansible_user: ubuntu  # or your cloud provider's default user
  ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

### 2. **Ensure SSH Access**

Make sure you can SSH to your server:

```bash
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_SERVER_IP
```

### 3. **Run the Provisioning**

```bash
# Make script executable (if not already done)
chmod +x deploy.sh

# Run the automated provisioning
./deploy.sh
```

## 🌐 Cloud Provider Quick Configs

### **AWS EC2**
```yaml
ansible_user: ubuntu
ansible_host: YOUR_EC2_PUBLIC_IP
# Make sure Security Group allows ports 22, 80, 443
```

### **Google Cloud Platform**
```yaml
ansible_user: ubuntu
ansible_host: YOUR_GCP_EXTERNAL_IP
# Make sure Firewall rules allow ports 22, 80, 443
```

### **DigitalOcean**
```yaml
ansible_user: root
ansible_host: YOUR_DROPLET_IP
# Make sure Firewall allows ports 22, 80, 443
```

### **Azure**
```yaml
ansible_user: azureuser
ansible_host: YOUR_AZURE_PUBLIC_IP
# Make sure NSG allows ports 22, 80, 443
```

## 🔧 What Happens Automatically

1. ✅ **System Setup**: Updates, essential packages, timezone
2. ✅ **Docker Installation**: Latest Docker CE + Docker Compose
3. ✅ **Security**: UFW firewall (only ports 22, 80, 443 open)
4. ✅ **Deployment Ready**: App directories, systemd service, logs

## 🚨 Common Issues & Quick Fixes

### **SSH Connection Failed**
```bash
# Check key permissions
chmod 600 ~/.ssh/id_rsa

# Test connection manually
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_SERVER_IP
```

### **Permission Denied**
```bash
# Add your user to docker group (after provisioning)
sudo usermod -aG docker $USER
newgrp docker
```

### **Firewall Blocking**
```bash
# Check UFW status
sudo ufw status

# If needed, reset and reconfigure
sudo ufw reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## 📊 Verify Your Setup

```bash
# Test connection
ansible webservers -m ping

# Check Docker
ansible webservers -m shell -a 'docker --version'

# Check firewall
ansible webservers -m shell -a 'sudo ufw status'

# Check services
ansible webservers -m shell -a 'systemctl status docker'
```

## 🎯 Next Steps After Provisioning

1. **Deploy Your App**: Use the CI/CD pipeline we created earlier
2. **Monitor**: Check logs and service status
3. **Scale**: Add more servers to the inventory
4. **Customize**: Modify roles for your specific needs

## 🆘 Need Help?

- Check the main `README.md` for detailed documentation
- Review Ansible output for specific error messages
- Ensure your server meets the prerequisites (Ubuntu 20.04+)
- Verify network connectivity and firewall rules

---

**🎉 You're all set! Your server will be automatically provisioned with Docker, security, and deployment readiness.** 