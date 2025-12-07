# 🚀 Quick Start Guide

## For Windows Users - Choose Your Method:

### Method 1: Run Directly on Windows (Easiest) ⚡

**Best for**: Quick testing and development

1. **Double-click** `run_windows.bat` OR

2. **Manual steps**:
   ```powershell
   cd D:\coding\msc\DEVOPSPROJECT
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python app.py
   ```

3. **Open browser**: `http://localhost:5000`

**Note**: This uses `psutil` which works on Windows but some Linux-specific features may differ.

---

### Method 2: Use WSL (Recommended for Linux Experience) 🐧

**Best for**: Learning Linux commands and production-like environment

1. **Install WSL**:
   ```powershell
   wsl --install
   # Restart computer
   ```

2. **Open WSL**:
   ```powershell
   wsl
   ```

3. **In WSL terminal**:
   ```bash
   cd /mnt/d/coding/msc/DEVOPSPROJECT
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python3 app.py
   ```

4. **Open browser**: `http://localhost:5000`

---

### Method 3: Use Docker 🐳

**Best for**: Containerized deployment and testing

1. **Install Docker Desktop**: https://www.docker.com/products/docker-desktop

2. **Build and run**:
   ```powershell
   cd D:\coding\msc\DEVOPSPROJECT
   docker build -t linux-monitor .
   docker run -p 5000:5000 linux-monitor
   ```

3. **Open browser**: `http://localhost:5000`

---

## 📋 What You Get

After running any method above, you'll have:

- ✅ Real-time CPU usage monitoring
- ✅ Memory (RAM) usage tracking
- ✅ Disk space monitoring
- ✅ Network statistics
- ✅ Top 10 processes by CPU
- ✅ System information (OS, uptime, etc.)
- ✅ Auto-refreshing dashboard (updates every 2 seconds)
- ✅ Beautiful charts and visualizations

---

## 🆘 Troubleshooting

### "Python is not recognized"
- Install Python from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation

### "Port 5000 already in use"
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual PID)
taskkill /PID <PID> /F
```

### "Module not found"
```powershell
# Make sure virtual environment is activated
.\venv\Scripts\Activate.ps1

# Reinstall dependencies
pip install -r requirements.txt
```

### WSL not starting
- Restart your computer
- Check Windows Features: Enable "Windows Subsystem for Linux"
- Update WSL: `wsl --update`

---

## 📚 More Information

- **Detailed Windows Setup**: See `WINDOWS_SETUP_GUIDE.md`
- **Full Documentation**: See `README.md`
- **Project Requirements**: See project description document

---

## 🎯 Recommended Workflow

1. **Start with Method 1** (Windows native) to test quickly
2. **Move to Method 2** (WSL) for Linux experience
3. **Use Method 3** (Docker) for production testing

---

**Happy Monitoring! 🎉**

