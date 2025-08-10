#!/bin/bash

# Mpay App Server Provisioning Script
set -e

# Configuration
INVENTORY_FILE="inventory.yml"
PLAYBOOK_FILE="playbook.yml"

echo "🚀 Mpay App Server Provisioning"
echo "=================================="

# Check if Ansible is installed
if ! command -v ansible &> /dev/null; then
    echo "❌ Ansible is not installed. Please install it first."
    echo "Installation commands:"
    echo "  Ubuntu/Debian: sudo apt install ansible"
    echo "  macOS: brew install ansible"
    echo "  CentOS/RHEL: sudo yum install ansible"
    exit 1
fi

# Check if inventory file exists
if [ ! -f "$INVENTORY_FILE" ]; then
    echo "❌ Inventory file '$INVENTORY_FILE' not found!"
    exit 1
fi

# Check if playbook file exists
if [ ! -f "$PLAYBOOK_FILE" ]; then
    echo "❌ Playbook file '$PLAYBOOK_FILE' not found!"
    exit 1
fi

# Install required collections
echo "📦 Installing required Ansible collections..."
ansible-galaxy collection install ansible.posix
ansible-galaxy collection install community.docker
ansible-galaxy collection install community.general

# Test connection
echo "🔍 Testing connection to servers..."
if ! ansible webservers -m ping; then
    echo "❌ Connection failed! Please check your inventory and SSH configuration."
    exit 1
fi

echo "✅ Connection successful!"

# Run the playbook
echo "🚀 Starting server provisioning..."
echo "This will install Docker, configure firewall, and setup the deployment environment."
echo ""

read -p "Do you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Provisioning cancelled."
    exit 0
fi

# Run the playbook
echo "🏗️  Running Ansible playbook..."
ansible-playbook "$PLAYBOOK_FILE" -i "$INVENTORY_FILE" -v

if [ $? -eq 0 ]; then
    echo "🎉 Server provisioning completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Your server is now ready for deployment"
    echo "2. Docker is installed and running"
    echo "3. Firewall is configured (ports 22, 80, 443 open)"
    echo "4. Deployment environment is set up"
    echo ""
    echo "🔍 To verify the setup:"
    echo "  ansible webservers -m shell -a 'docker --version'"
    echo "  ansible webservers -m shell -a 'sudo ufw status'"
    echo "  ansible webservers -m shell -a 'systemctl status mpay-app'"
else
    echo "❌ Server provisioning failed!"
    echo "Check the output above for errors and try again."
    exit 1
fi 