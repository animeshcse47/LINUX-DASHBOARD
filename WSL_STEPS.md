# 🐧 Running in WSL - Step by Step

Since you've installed WSL, follow these steps to run your dashboard:

## 📋 Step-by-Step Instructions

### Step 1: Open WSL Terminal
You're already in WSL! (I can see from your terminal prompt)

### Step 2: Navigate to Your Project
```bash
cd /mnt/d/coding/msc/DEVOPSPROJECT
```

### Step 3: Install Python 3 (if not already installed)
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv
```

### Step 4: Create Virtual Environment
```bash
python3 -m venv venv_wsl
```

### Step 5: Activate Virtual Environment
```bash
source venv_wsl/bin/activate
```

You should see `(venv_wsl)` at the beginning of your prompt.

### Step 6: Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 7: Run the Application
```bash
python3 app.py
```

You should see:
```
==================================================
Linux Server Monitor Dashboard
==================================================
Platform: Linux
Starting server on http://localhost:5000
Press Ctrl+C to stop
==================================================
```

### Step 8: Open Dashboard in Browser
Open your **Windows browser** and go to:
```
http://localhost:5000
```

---

## 🚀 Quick Method (Using Script)

Or simply run the provided script:

```bash
cd /mnt/d/coding/msc/DEVOPSPROJECT
chmod +x run_wsl.sh
./run_wsl.sh
```

---

## 📝 What You'll See

Once running, the dashboard will show:
- ✅ Real-time CPU usage
- ✅ Memory (RAM) usage
- ✅ Disk space
- ✅ Network statistics
- ✅ Top 10 processes
- ✅ System information

The dashboard auto-refreshes every 2 seconds!

---

## 🛑 To Stop the Server

Press `Ctrl+C` in the WSL terminal.

---

## 🔄 Next Time

Just run:
```bash
cd /mnt/d/coding/msc/DEVOPSPROJECT
source venv_wsl/bin/activate
python3 app.py
```

---

## ⚠️ Troubleshooting

### "Permission denied" when running script
```bash
chmod +x run_wsl.sh
```

### "Port 5000 already in use"
```bash
# Find process using port 5000
sudo lsof -i :5000
# Kill it (replace <PID> with actual PID)
sudo kill -9 <PID>
```

### "Module not found"
Make sure virtual environment is activated:
```bash
source venv_wsl/bin/activate
```

---

**You're all set! 🎉**

