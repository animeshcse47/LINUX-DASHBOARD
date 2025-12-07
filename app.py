"""
Linux Server Monitor Web Dashboard
Compatible with both Windows (using psutil) and Linux
"""

from flask import Flask, render_template, jsonify
import psutil
import platform
import json
from datetime import datetime

app = Flask(__name__)

def get_system_info():
    """Get system information using psutil (works on Windows and Linux)"""
    try:
        # CPU Information
        cpu_percent = psutil.cpu_percent(interval=1)
        cpu_count = psutil.cpu_count()
        cpu_freq = psutil.cpu_freq()
        
        # Memory Information
        memory = psutil.virtual_memory()
        swap = psutil.swap_memory()
        
        # Disk Information
        disk = psutil.disk_usage('/')
        if platform.system() == 'Windows':
            disk = psutil.disk_usage('C:\\')
        
        # Network Information
        net_io = psutil.net_io_counters()
        
        # Boot Time
        boot_time = datetime.fromtimestamp(psutil.boot_time())
        uptime = datetime.now() - boot_time
        
        # Process Information
        processes = []
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):
            try:
                processes.append({
                    'pid': proc.info['pid'],
                    'name': proc.info['name'],
                    'cpu': proc.info['cpu_percent'] or 0,
                    'memory': proc.info['memory_percent'] or 0
                })
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass
        
        # Sort by CPU usage and get top 10
        processes = sorted(processes, key=lambda x: x['cpu'], reverse=True)[:10]
        
        return {
            'cpu': {
                'percent': cpu_percent,
                'count': cpu_count,
                'frequency': {
                    'current': cpu_freq.current if cpu_freq else 0,
                    'min': cpu_freq.min if cpu_freq else 0,
                    'max': cpu_freq.max if cpu_freq else 0
                }
            },
            'memory': {
                'total': memory.total,
                'available': memory.available,
                'used': memory.used,
                'percent': memory.percent,
                'free': memory.free
            },
            'swap': {
                'total': swap.total,
                'used': swap.used,
                'free': swap.free,
                'percent': swap.percent
            },
            'disk': {
                'total': disk.total,
                'used': disk.used,
                'free': disk.free,
                'percent': (disk.used / disk.total) * 100
            },
            'network': {
                'bytes_sent': net_io.bytes_sent,
                'bytes_recv': net_io.bytes_recv,
                'packets_sent': net_io.packets_sent,
                'packets_recv': net_io.packets_recv
            },
            'uptime': {
                'days': uptime.days,
                'hours': uptime.seconds // 3600,
                'minutes': (uptime.seconds % 3600) // 60,
                'seconds': uptime.seconds % 60
            },
            'processes': processes,
            'platform': {
                'system': platform.system(),
                'release': platform.release(),
                'version': platform.version(),
                'machine': platform.machine()
            }
        }
    except Exception as e:
        return {'error': str(e)}

@app.route('/')
def index():
    """Main dashboard page"""
    return render_template('index.html')

@app.route('/api/system')
def api_system():
    """API endpoint for system metrics"""
    return jsonify(get_system_info())

@app.route('/api/health')
def api_health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("=" * 50)
    print("Linux Server Monitor Dashboard")
    print("=" * 50)
    print(f"Platform: {platform.system()}")
    print("Starting server on http://localhost:5000")
    print("Press Ctrl+C to stop")
    print("=" * 50)
    app.run(debug=True, host='0.0.0.0', port=5000)

