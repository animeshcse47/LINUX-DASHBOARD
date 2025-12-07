# Linux Server Monitor Web Dashboard

A real-time web-based monitoring dashboard for Linux servers that displays system performance metrics including CPU usage, memory load, disk space, network statistics, and running processes.

## 🎯 Features

- **Real-time Monitoring**: Auto-refreshing dashboard with live system metrics
- **CPU Monitoring**: Current usage, frequency, and core count
- **Memory Tracking**: RAM usage, swap memory, and detailed statistics
- **Disk Usage**: Storage utilization with visual charts
- **Network Statistics**: Bytes sent/received and packet information
- **Process Monitoring**: Top 10 processes by CPU usage
- **System Information**: OS details, uptime, and platform information
- **Responsive Design**: Works on desktop and mobile devices

## 🖥️ Platform Support

- ✅ **Linux** (RHEL, Rocky Linux, Ubuntu)
- ✅ **Windows** (using psutil library)
- ✅ **WSL** (Windows Subsystem for Linux)

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## 🚀 Quick Start

### For Windows Users:

1. **Install Python** (if not already installed):
   ```powershell
   # Download from https://www.python.org/downloads/
   # Make sure to check "Add Python to PATH" during installation
   ```

2. **Navigate to project directory**:
   ```powershell
   cd D:\coding\msc\DEVOPSPROJECT
   ```

3. **Create virtual environment** (recommended):
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

4. **Install dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

5. **Run the application**:
   ```powershell
   python app.py
   ```

6. **Access the dashboard**:
   Open your browser and navigate to: `http://localhost:5000`

### For Linux/WSL Users:

1. **Install Python and pip**:
   ```bash
   sudo apt update
   sudo apt install python3 python3-pip -y
   ```

2. **Navigate to project directory**:
   ```bash
   cd /path/to/DEVOPSPROJECT
   ```

3. **Create virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**:
   ```bash
   python3 app.py
   ```

6. **Access the dashboard**:
   Open your browser and navigate to: `http://localhost:5000`

## 📁 Project Structure

```
DEVOPSPROJECT/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── WINDOWS_SETUP_GUIDE.md # Detailed Windows setup guide
├── templates/
│   └── index.html        # Dashboard HTML template
└── static/
    ├── css/
    │   └── style.css     # Custom styles
    └── js/
        └── dashboard.js  # Dashboard JavaScript logic
```

## 🔧 Configuration

### Change Port

Edit `app.py` and modify the last line:
```python
app.run(debug=True, host='0.0.0.0', port=5000)  # Change port here
```

### Update Refresh Rate

Edit `static/js/dashboard.js` and modify:
```javascript
setInterval(fetchSystemData, 2000);  // Change 2000 (ms) to desired interval
```

## 🌐 API Endpoints

- `GET /` - Main dashboard page
- `GET /api/system` - Get system metrics (JSON)
- `GET /api/health` - Health check endpoint

## 📊 Metrics Displayed

1. **CPU Usage**: Real-time percentage and historical chart
2. **Memory**: RAM usage with used/free/total breakdown
3. **Disk**: Storage utilization with visual representation
4. **Network**: Bytes sent/received statistics
5. **Processes**: Top 10 processes sorted by CPU usage
6. **System Info**: OS, uptime, CPU cores, and platform details

## 🐳 Docker Support

See `WINDOWS_SETUP_GUIDE.md` for Docker setup instructions.

## 🔒 Security Notes

- This is a development version. For production:
  - Add authentication (basic auth or OAuth)
  - Use HTTPS
  - Configure firewall rules
  - Use a production WSGI server (gunicorn, uWSGI)
  - Set up nginx as reverse proxy

## 🛠️ Troubleshooting

### Port Already in Use
```powershell
# Windows: Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/WSL:
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Permission Denied (Linux)
```bash
# Make sure you have permissions to read system information
# Some metrics may require sudo, but psutil usually works without it
```

### Module Not Found
```bash
# Make sure virtual environment is activated
# Reinstall dependencies:
pip install -r requirements.txt --force-reinstall
```

## 📚 Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Charts**: Chart.js
- **UI Framework**: Bootstrap 5
- **System Monitoring**: psutil

## 🔄 Next Steps

1. Add authentication
2. Implement data persistence (database)
3. Add alerting system
4. Support multiple servers
5. Add historical data tracking
6. Implement HTTPS
7. Add email/SMS notifications

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Note**: For detailed Windows setup instructions, see `WINDOWS_SETUP_GUIDE.md`

