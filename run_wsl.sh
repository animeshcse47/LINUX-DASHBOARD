#!/bin/bash

echo "========================================"
echo "Linux Server Monitor Dashboard"
echo "WSL Quick Start Script"
echo "========================================"
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Installing..."
    sudo apt update
    sudo apt install -y python3 python3-pip python3-venv
fi

echo "Python 3 found!"
python3 --version
echo ""

# Navigate to project directory
PROJECT_DIR="/mnt/d/coding/msc/DEVOPSPROJECT"
cd "$PROJECT_DIR" || exit 1

echo "Current directory: $(pwd)"
echo ""

# Check if virtual environment exists
if [ ! -d "venv_wsl" ]; then
    echo "Creating virtual environment for WSL..."
    python3 -m venv venv_wsl
    echo "Virtual environment created!"
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv_wsl/bin/activate

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "========================================"
echo "Starting server..."
echo "Dashboard will be available at: http://localhost:5000"
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

# Run the application
python3 app.py

