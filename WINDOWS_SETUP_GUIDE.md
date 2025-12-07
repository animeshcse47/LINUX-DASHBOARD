# Running Linux Server Monitor Dashboard on Windows

This guide provides multiple approaches to run your Linux Server Monitor Web Dashboard on a Windows system.

## 🎯 Overview

Since the project is designed for Linux environments, you have several options to run it on Windows:

1. **WSL (Windows Subsystem for Linux)** - ⭐ **RECOMMENDED**
2. **Docker Desktop** - Great for containerization
3. **Virtual Machine (VM)** - Full Linux environment
4. **Windows-Compatible Version** - Using psutil (works on Windows)

---

## Option 1: WSL (Windows Subsystem for Linux) - RECOMMENDED ⭐

### Why WSL?
- Native Linux environment on Windows
- Best performance
- Direct access to Linux commands
- Easy integration with Windows

### Setup Steps:

#### Step 1: Install WSL
```powershell
# Open PowerShell as Administrator and run:
wsl --install

# Or install a specific distribution:
wsl --install -d Ubuntu-22.04
# or
wsl --install -d RockyLinux-9
```

#### Step 2: Restart Your Computer
After installation, restart Windows to complete WSL setup.

#### Step 3: Launch WSL
```powershell
# Open PowerShell or Command Prompt:
wsl
```

#### Step 4: Update WSL
```bash
sudo apt update && sudo apt upgrade -y
```

#### Step 5: Install Required Software in WSL
```bash
# Install Python 3 and pip
sudo apt install python3 python3-pip -y

# Install Node.js (if using Node.js backend)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install nginx (optional, for production)
sudo apt install nginx -y

# Install system monitoring tools
sudo apt install htop iotop net-tools -y
```

#### Step 6: Navigate to Your Project
```bash
# In WSL, navigate to your Windows project folder
cd /mnt/d/coding/msc/DEVOPSPROJECT

# Or create the project in WSL's home directory
cd ~
mkdir -p devops-project
cd devops-project
```

#### Step 7: Run Your Application
```bash
# Install Python dependencies
pip3 install flask psutil

# Run Flask app
python3 app.py
```

#### Step 8: Access from Windows Browser
- The Flask app will be accessible at: `http://localhost:5000`
- You can access it from your Windows browser!

### WSL Tips:
- Access Windows files: `/mnt/d/coding/msc/DEVOPSPROJECT`
- Access WSL files from Windows: `\\wsl$\Ubuntu\home\username`
- Use VS Code with WSL extension for seamless development

---

## Option 2: Docker Desktop

### Why Docker?
- Isolated Linux environment
- Consistent across different systems
- Easy deployment
- No need to install Linux directly

### Setup Steps:

#### Step 1: Install Docker Desktop
1. Download Docker Desktop for Windows: https://www.docker.com/products/docker-desktop
2. Install and restart your computer
3. Ensure WSL 2 backend is enabled (Docker Desktop will prompt you)

#### Step 2: Create Dockerfile
Create `Dockerfile` in your project:
```dockerfile
FROM python:3.11-slim

# Install system tools
RUN apt-get update && apt-get install -y \
    htop \
    iotop \
    net-tools \
    procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

#### Step 3: Create docker-compose.yml (Optional)
```yaml
version: '3.8'

services:
  monitor:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/app
    environment:
      - FLASK_ENV=development
    restart: unless-stopped
```

#### Step 4: Build and Run
```powershell
# In PowerShell, navigate to project directory
cd D:\coding\msc\DEVOPSPROJECT

# Build Docker image
docker build -t linux-monitor .

# Run container
docker run -p 5000:5000 linux-monitor

# Or use docker-compose
docker-compose up
```

#### Step 5: Access Dashboard
Open browser: `http://localhost:5000`

---

## Option 3: Virtual Machine (VM)

### Why VM?
- Full Linux environment
- Complete isolation
- Best for learning Linux

### Setup Steps:

#### Step 1: Install Virtualization Software
- **VirtualBox** (Free): https://www.virtualbox.org/
- **VMware Workstation Player** (Free for personal use): https://www.vmware.com/products/workstation-player.html
- **Hyper-V** (Built into Windows Pro/Enterprise)

#### Step 2: Download Linux ISO
- Ubuntu: https://ubuntu.com/download
- Rocky Linux: https://rockylinux.org/download
- RHEL: https://developers.redhat.com/products/rhel/download

#### Step 3: Create VM
1. Create new VM (2GB RAM, 2 CPUs minimum)
2. Install Linux OS
3. Install Guest Additions (for VirtualBox/VMware)

#### Step 4: Install Software in VM
```bash
sudo apt update
sudo apt install python3 python3-pip nginx -y
pip3 install flask psutil
```

#### Step 5: Configure Network
- **NAT**: Access from Windows via port forwarding
- **Bridged**: VM gets its own IP on your network

#### Step 6: Run Application
Same as WSL steps above.

---

## Option 4: Windows-Compatible Version (Using psutil)

### Why This Approach?
- Run directly on Windows
- No Linux installation needed
- Good for development/testing

### Important Notes:
- Some Linux-specific commands won't work
- Use `psutil` library (works on Windows)
- Adapt commands for Windows equivalents

### Setup Steps:

#### Step 1: Install Python on Windows
1. Download Python 3.11+: https://www.python.org/downloads/
2. Install with "Add Python to PATH" checked

#### Step 2: Install Dependencies
```powershell
# Open PowerShell
cd D:\coding\msc\DEVOPSPROJECT

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install packages
pip install flask psutil
```

#### Step 3: Modify Code for Windows Compatibility
- Use `psutil` instead of `top`, `htop`, `df`, `free`
- Replace `netstat` with `psutil.net_connections()`
- Use `psutil.disk_usage()` instead of `df`
- Use `psutil.virtual_memory()` instead of `free`

#### Step 4: Run Application
```powershell
python app.py
```

#### Step 5: Access Dashboard
Open browser: `http://localhost:5000`

---

## 📋 Comparison Table

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **WSL** | Native Linux, Fast, Easy | Requires Windows 10/11 | Development, Learning |
| **Docker** | Isolated, Portable | Requires Docker Desktop | Production-like testing |
| **VM** | Full Linux, Isolated | Resource intensive | Complete Linux experience |
| **Windows Native** | No setup needed | Limited Linux features | Quick testing |

---

## 🚀 Recommended Development Workflow

### For Development:
1. **Use WSL** for Linux commands and environment
2. **Use VS Code with WSL extension** for editing
3. **Run Flask app in WSL**
4. **Access from Windows browser**

### For Production Testing:
1. **Use Docker** to test containerized deployment
2. **Test with nginx** reverse proxy
3. **Test HTTPS** configuration

---

## 🔧 Quick Start Commands

### WSL Setup (One-time):
```powershell
wsl --install
# Restart computer
wsl
sudo apt update && sudo apt upgrade -y
sudo apt install python3 python3-pip -y
```

### Daily Development:
```bash
# In WSL
cd /mnt/d/coding/msc/DEVOPSPROJECT
python3 app.py
```

### Docker Setup (One-time):
```powershell
# Install Docker Desktop, then:
cd D:\coding\msc\DEVOPSPROJECT
docker build -t linux-monitor .
docker run -p 5000:5000 linux-monitor
```

---

## 📝 Next Steps

1. Choose your preferred method (WSL recommended)
2. Set up the development environment
3. Build your Flask/Node.js application
4. Test the dashboard functionality
5. Deploy to a Linux server for production

---

## 🆘 Troubleshooting

### WSL Issues:
- **WSL not starting**: Restart Windows, check BIOS virtualization settings
- **Permission denied**: Use `sudo` for system commands
- **Port already in use**: Change Flask port or kill process using port

### Docker Issues:
- **Docker not starting**: Ensure WSL 2 is installed and updated
- **Build fails**: Check Dockerfile syntax and dependencies

### Network Issues:
- **Can't access from browser**: Check firewall settings
- **Port blocked**: Allow port 5000 in Windows Firewall

---

## 📚 Additional Resources

- WSL Documentation: https://learn.microsoft.com/en-us/windows/wsl/
- Docker Documentation: https://docs.docker.com/
- psutil Documentation: https://psutil.readthedocs.io/
- Flask Documentation: https://flask.palletsprojects.com/

---

**Recommendation**: Start with **WSL** for the best balance of ease and Linux compatibility!

