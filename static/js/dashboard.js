// Dashboard JavaScript for real-time monitoring

// Chart instances
let cpuChart, memoryChart, diskChart, networkChart;

// Data arrays for charts (last 20 data points)
const maxDataPoints = 20;
let cpuData = [];
let memoryData = [];
let diskData = [];
let networkSentData = [];
let networkRecvData = [];
let timeLabels = [];

// Initialize charts
function initCharts() {
    // CPU Chart
    const cpuCtx = document.getElementById('cpuChart').getContext('2d');
    cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'CPU Usage %',
                data: cpuData,
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.15)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(124, 58, 237, 0.1)',
                        borderColor: 'rgba(124, 58, 237, 0.3)'
                    },
                    ticks: {
                        color: '#b8b8d4',
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(124, 58, 237, 0.1)',
                        borderColor: 'rgba(124, 58, 237, 0.3)'
                    },
                    ticks: {
                        color: '#b8b8d4',
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Memory Chart
    const memoryCtx = document.getElementById('memoryChart').getContext('2d');
    memoryChart = new Chart(memoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Free'],
            datasets: [{
                data: [0, 100],
                backgroundColor: [
                    'rgba(124, 58, 237, 0.9)',
                    'rgba(59, 130, 246, 0.2)'
                ],
                borderColor: [
                    '#8b5cf6',
                    'rgba(59, 130, 246, 0.3)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Disk Chart
    const diskCtx = document.getElementById('diskChart').getContext('2d');
    diskChart = new Chart(diskCtx, {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Free'],
            datasets: [{
                data: [0, 100],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.9)',
                    'rgba(124, 58, 237, 0.2)'
                ],
                borderColor: [
                    '#60a5fa',
                    'rgba(124, 58, 237, 0.3)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Network Chart
    const networkCtx = document.getElementById('networkChart').getContext('2d');
    networkChart = new Chart(networkCtx, {
        type: 'bar',
        data: {
            labels: ['Sent', 'Received'],
            datasets: [{
                label: 'Network Traffic (MB)',
                data: [0, 0],
                backgroundColor: [
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderColor: [
                    '#8b5cf6',
                    '#60a5fa'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(124, 58, 237, 0.1)',
                        borderColor: 'rgba(124, 58, 237, 0.3)'
                    },
                    ticks: {
                        color: '#b8b8d4',
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#b8b8d4',
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Format bytes to human readable
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Update dashboard with new data
function updateDashboard(data) {
    if (data.error) {
        console.error('Error fetching data:', data.error);
        return;
    }

    // Update system info
    document.getElementById('osInfo').textContent = 
        `${data.platform.system} ${data.platform.release}`;
    document.getElementById('cpuCores').textContent = data.cpu.count;
    
    const uptime = data.uptime;
    document.getElementById('uptimeInfo').textContent = 
        `${uptime.days}d ${uptime.hours}h ${uptime.minutes}m`;

    // Update CPU
    const cpuPercent = data.cpu.percent;
    document.getElementById('cpuPercent').textContent = cpuPercent.toFixed(1) + '%';
    
    // Update CPU chart
    const now = new Date().toLocaleTimeString();
    timeLabels.push(now);
    cpuData.push(cpuPercent);
    
    if (timeLabels.length > maxDataPoints) {
        timeLabels.shift();
        cpuData.shift();
    }
    
    cpuChart.data.labels = timeLabels;
    cpuChart.data.datasets[0].data = cpuData;
    cpuChart.update('none');

    // Update Memory
    const memoryPercent = data.memory.percent;
    document.getElementById('memoryPercent').textContent = memoryPercent.toFixed(1) + '%';
    document.getElementById('memoryUsed').textContent = formatBytes(data.memory.used);
    document.getElementById('memoryFree').textContent = formatBytes(data.memory.free);
    document.getElementById('memoryTotal').textContent = formatBytes(data.memory.total);
    
    memoryChart.data.datasets[0].data = [memoryPercent, 100 - memoryPercent];
    memoryChart.update('none');

    // Update Disk
    const diskPercent = data.disk.percent;
    document.getElementById('diskPercent').textContent = diskPercent.toFixed(1) + '%';
    document.getElementById('diskUsed').textContent = formatBytes(data.disk.used);
    document.getElementById('diskFree').textContent = formatBytes(data.disk.free);
    document.getElementById('diskTotal').textContent = formatBytes(data.disk.total);
    
    diskChart.data.datasets[0].data = [diskPercent, 100 - diskPercent];
    diskChart.update('none');

    // Update Network
    const sentMB = data.network.bytes_sent / (1024 * 1024);
    const recvMB = data.network.bytes_recv / (1024 * 1024);
    document.getElementById('networkSent').textContent = sentMB.toFixed(2) + ' MB';
    document.getElementById('networkRecv').textContent = recvMB.toFixed(2) + ' MB';
    
    networkChart.data.datasets[0].data = [sentMB, recvMB];
    networkChart.update('none');

    // Update Processes Table
    const processTable = document.getElementById('processTable');
    processTable.innerHTML = '';
    
    if (data.processes && data.processes.length > 0) {
        data.processes.forEach(proc => {
            const row = processTable.insertRow();
            row.insertCell(0).textContent = proc.pid;
            row.insertCell(1).textContent = proc.name;
            row.insertCell(2).textContent = proc.cpu.toFixed(2) + '%';
            row.insertCell(3).textContent = proc.memory.toFixed(2) + '%';
        });
    } else {
        const row = processTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 4;
        cell.textContent = 'No process data available';
        cell.className = 'text-center';
    }

    // Update last update time
    document.getElementById('lastUpdate').textContent = 
        'Last Update: ' + new Date().toLocaleTimeString();
}

// Fetch system data from API
async function fetchSystemData() {
    try {
        const response = await fetch('/api/system');
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.error('Error fetching system data:', error);
        document.getElementById('statusBadge').textContent = 'Error';
        document.getElementById('statusBadge').className = 'badge bg-danger';
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    fetchSystemData(); // Initial fetch
    
    // Update every 2 seconds
    setInterval(fetchSystemData, 2000);
});

