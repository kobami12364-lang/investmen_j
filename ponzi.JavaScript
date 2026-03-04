// Data dummy
let historyData = {
    deposit: [
        { id: 1, amount: 50000, method: 'DANA', status: 'success', date: '2024-01-15' },
        { id: 2, amount: 100000, method: 'OVO', status: 'success', date: '2024-01-15' },
        { id: 3, amount: 200000, method: 'GoPay', status: 'success', date: '2024-01-15' },
        { id: 4, amount: 50000, method: 'QRIS', status: 'success', date: '2024-01-14' },
        { id: 5, amount: 300000, method: 'BRI', status: 'pending', date: '2024-01-14' }
    ],
    withdraw: [
        { id: 1, amount: 200000, method: 'DANA', status: 'success', date: '2024-01-15' },
        { id: 2, amount: 500000, method: 'OVO', status: 'success', date: '2024-01-15' },
        { id: 3, amount: 1000000, method: 'BRI', status: 'success', date: '2024-01-15' },
        { id: 4, amount: 50000, method: 'ShopeePay', status: 'success', date: '2024-01-14' },
        { id: 5, amount: 250000, method: 'GoPay', status: 'pending', date: '2024-01-14' }
    ],
    profit: [
        { id: 1, amount: 10000, package: 'Pemula', date: '2024-01-15' },
        { id: 2, amount: 20000, package: 'Bronze', date: '2024-01-15' },
        { id: 3, amount: 30000, package: 'Silver', date: '2024-01-15' },
        { id: 4, amount: 40000, package: 'Gold', date: '2024-01-14' },
        { id: 5, amount: 60000, package: 'Platinum', date: '2024-01-14' }
    ]
};

// Notifikasi deposit & withdraw random
const depositNotifications = [
    { name: 'Andi***', amount: 50000, method: 'DANA' },
    { name: 'Budi***', amount: 200000, method: 'OVO' },
    { name: 'Citra***', amount: 100000, method: 'GoPay' },
    { name: 'Dewi***', amount: 50000, method: 'QRIS' },
    { name: 'Eko***', amount: 300000, method: 'BRI' },
    { name: 'Fajar***', amount: 100000, method: 'ShopeePay' },
    { name: 'Gita***', amount: 200000, method: 'DANA' },
    { name: 'Hadi***', amount: 500000, method: 'OVO' }
];

const withdrawNotifications = [
    { name: 'Indah***', amount: 200000, method: 'DANA' },
    { name: 'Joko***', amount: 500000, method: 'OVO' },
    { name: 'Kiki***', amount: 1000000, method: 'BRI' },
    { name: 'Lina***', amount: 50000, method: 'GoPay' },
    { name: 'Maman***', amount: 250000, method: 'ShopeePay' },
    { name: 'Nina***', amount: 750000, method: 'DANA' },
    { name: 'Oscar***', amount: 150000, method: 'OVO' },
    { name: 'Putri***', amount: 500000, method: 'BRI' }
];

// Stats
let totalUsers = 691;
let onlineUsers = 691;
let todayWithdraw = 30000000;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan riwayat default
    showHistory('deposit');
    
    // Mulai notifikasi
    startNotifications();
    
    // Update stats
    updateStats();
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});

// Notifikasi berjalan
function startNotifications() {
    // Ticker notifications
    setInterval(() => {
        showTickerNotification();
    }, 5000);
    
    // Activity feed
    setInterval(() => {
        addActivityFeed();
    }, 8000);
}

function showTickerNotification() {
    const ticker = document.getElementById('tickerContent');
    
    // Random antara deposit atau withdraw
    const isDeposit = Math.random() > 0.5;
    
    if (isDeposit) {
        const notif = depositNotifications[Math.floor(Math.random() * depositNotifications.length)];
        const item = document.createElement('div');
        item.className = 'ticker-item';
        item.innerHTML = `
            <i class="fas fa-arrow-down" style="color: #4cc9f0;"></i>
            <span><strong>${notif.name}</strong> deposit <strong>Rp ${formatNumber(notif.amount)}</strong> via ${notif.method}</span>
            <i class="fas fa-check-circle check" style="color: #4cc9f0;"></i>
            <span class="time">${getTimeAgo()}</span>
        `;
        ticker.appendChild(item);
        
        // Hapus setelah animasi selesai
        setTimeout(() => {
            item.remove();
        }, 10000);
    } else {
        const notif = withdrawNotifications[Math.floor(Math.random() * withdrawNotifications.length)];
        const item = document.createElement('div');
        item.className = 'ticker-item';
        item.innerHTML = `
            <i class="fas fa-arrow-up" style="color: #f72585;"></i>
            <span><strong>${notif.name}</strong> menarik <strong>Rp ${formatNumber(notif.amount)}</strong> ke ${notif.method}</span>
            <i class="fas fa-check-circle check" style="color: #f72585;"></i>
            <span class="time">${getTimeAgo()}</span>
        `;
        ticker.appendChild(item);
        
        setTimeout(() => {
            item.remove();
        }, 10000);
    }
}

function addActivityFeed() {
    const feed = document.getElementById('activityFeed');
    const isDeposit = Math.random() > 0.5;
    
    let item = document.createElement('div');
    item.className = 'feed-item';
    
    if (isDeposit) {
        const notif = depositNotifications[Math.floor(Math.random() * depositNotifications.length)];
        item.classList.add('deposit');
        item.innerHTML = `
            <i class="fas fa-arrow-down"></i>
            <div>
                <strong>${notif.name}</strong> melakukan deposit <strong>Rp ${formatNumber(notif.amount)}</strong>
                <div><small>via ${notif.method}</small></div>
            </div>
            <i class="fas fa-check-circle check"></i>
            <span class="time">${getTimeAgo()}</span>
        `;
    } else {
        const notif = withdrawNotifications[Math.floor(Math.random() * withdrawNotifications.length)];
        item.classList.add('withdraw');
        item.innerHTML = `
            <i class="fas fa-arrow-up"></i>
            <div>
                <strong>${notif.name}</strong> menarik <strong>Rp ${formatNumber(notif.amount)}</strong>
                <div><small>ke ${notif.method}</small></div>
            </div>
            <i class="fas fa-check-circle check"></i>
            <span class="time">${getTimeAgo()}</span>
        `;
    }
    
    feed.insertBefore(item, feed.firstChild);
    
    // Batasi maksimal 5 item
    if (feed.children.length > 5) {
        feed.removeChild(feed.lastChild);
    }
}

function updateStats() {
    // Update total users (random increment)
    setInterval(() => {
        totalUsers += Math.floor(Math.random() * 2);
        onlineUsers = totalUsers; // Semua online
        
        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('onlineUsers').textContent = onlineUsers;
        document.getElementById('totalUsersLarge').textContent = totalUsers;
        document.getElementById('onlineUsersLarge').textContent = onlineUsers;
    }, 30000);
    
    // Update withdraw today (random increment)
    setInterval(() => {
        todayWithdraw += Math.floor(Math.random() * 1000000) + 500000;
        const withdrawText = `Rp ${formatNumber(todayWithdraw)}+`;
        
        document.getElementById('todayWithdraw').textContent = withdrawText;
        document.getElementById('withdrawToday').textContent = withdrawText;
    }, 60000);
}

// Modal Functions
function openModal(type, amount = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    let content = '';
    
    switch(type) {
        case 'login':
            content = `
                <h2 class="gradient" style="margin-bottom: 20px;">Login</h2>
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label>Email / No. HP</label>
                        <input type="text" placeholder="Masukkan email atau nomor HP" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Masukkan password" required>
                    </div>
                    <button type="submit" class="btn-submit">Login</button>
                </form>
                <p style="text-align: center; margin-top: 15px;">
                    Belum punya akun? 
                    <a href="#" onclick="openModal('register'); return false;" style="color: #4361ee;">Daftar</a>
                </p>
            `;
            break;
            
        case 'register':
            content = `
                <h2 class="gradient" style="margin-bottom: 20px;">Daftar</h2>
                <form onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" placeholder="Masukkan nama lengkap" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Masukkan email" required>
                    </div>
                    <div class="form-group">
                        <label>No. Handphone</label>
                        <input type="tel" placeholder="Masukkan nomor HP" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Masukkan password" required>
                    </div>
                    <div class="form-group">
                        <label>Konfirmasi Password</label>
                        <input type="password" placeholder="Konfirmasi password" required>
                    </div>
                    <button type="submit" class="btn-submit">Daftar</button>
                </form>
                <p style="text-align: center; margin-top: 15px;">
                    Sudah punya akun? 
                    <a href="#" onclick="openModal('login'); return false;" style="color: #4361ee;">Login</a>
                </p>
            `;
            break;
            
        case 'deposit':
            content = `
                <h2 class="gradient" style="margin-bottom: 20px;">Deposit</h2>
                <form onsubmit="handleDeposit(event)">
                    <div class="form-group">
                        <label>Jumlah (Min. Rp 50.000)</label>
                        <input type="number" min="50000" step="10000" value="${amount || 50000}" required>
                    </div>
                    <div class="form-group">
                        <label>Metode</label>
                        <select required>
                            <option value="">Pilih metode</option>
                            <option value="QRIS">QRIS</option>
                            <option value="DANA">DANA</option>
                            <option value="OVO">OVO</option>
                            <option value="GoPay">GoPay</option>
                            <option value="BRI">BRI</option>
                            <option value="ShopeePay">ShopeePay</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-submit">Deposit Sekarang</button>
                </form>
            `;
            break;
            
        case 'withdraw':
            content = `
                <h2 class="gradient" style="margin-bottom: 20px;">Penarikan</h2>
                <form onsubmit="handleWithdraw(event)">
                    <div class="form-group">
                        <label>Jumlah (Min. Rp 50.000)</label>
                        <input type="number" min="50000" step="10000" required>
                    </div>
                    <div class="form-group">
                        <label>Metode</label>
                        <select required>
                            <option value="">Pilih metode</option>
                            <option value="DANA">DANA</option>
                            <option value="OVO">OVO</option>
                            <option value="GoPay">GoPay</option>
                            <option value="BRI">BRI</option>
                            <option value="ShopeePay">ShopeePay</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Nomor Tujuan</label>
                        <input type="text" placeholder="Masukkan nomor rekening/ewallet" required>
                    </div>
                    <button type="submit" class="btn-submit">Ajukan Penarikan</button>
                </form>
            `;
            break;
            
        case 'livechat':
            content = `
                <h2 class="gradient" style="margin-bottom: 20px;">💬 Live Chat</h2>
                <p style="margin-bottom: 20px;">Pilih kendala yang Anda alami:</p>
                
                <div style="display: grid; gap: 10px;">
                    <button onclick="chatWith('deposit')" style="padding: 15px; background: linear-gradient(135deg, #4361ee, #3f37c9); color: white; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-arrow-down"></i> Masalah Deposit
                    </button>
                    
                    <button onclick="chatWith('withdraw')" style="padding: 15px; background: linear-gradient(135deg, #f72585, #b5179e); color: white; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-arrow-up"></i> Masalah Penarikan
                    </button>
                    
                    <button onclick="chatWith('other')" style="padding: 15px; background: linear-gradient(135deg, #4cc9f0, #4895ef); color: white; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-question-circle"></i> Lainnya
                    </button>
                </div>
                
                <p style="text-align: center; margin-top: 20px; color: #666;">
                    <i class="fab fa-whatsapp" style="color: #25D366;"></i> Live Chat 24/7
                </p>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    alert('✅ Login berhasil! Selamat datang di PROFT PGL');
    closeModal();
    updateUIAfterLogin();
}

function handleRegister(e) {
    e.preventDefault();
    alert('✅ Pendaftaran berhasil! Silakan login.');
    openModal('login');
}

function handleDeposit(e) {
    e.preventDefault();
    const form = e.target;
    const amount = form.querySelector('input[type="number"]').value;
    const method = form.querySelector('select').value;
    
    alert(`✅ Deposit Rp ${formatNumber(amount)} via ${method} berhasil diajukan!`);
    
    // Tambah ke riwayat
    historyData.deposit.unshift({
        id: historyData.deposit.length + 1,
        amount: parseInt(amount),
        method: method,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
    });
    
    closeModal();
    showHistory('deposit');
}

function handleWithdraw(e) {
    e.preventDefault();
    const form = e.target;
    const amount = form.querySelector('input[type="number"]').value;
    const method = form.querySelector('select').value;
    
    if (amount < 50000) {
        alert('❌ Minimal penarikan Rp 50.000');
        return;
    }
    
    alert(`✅ Penarikan Rp ${formatNumber(amount)} via ${method} berhasil diajukan!`);
    
    // Tambah ke riwayat
    historyData.withdraw.unshift({
        id: historyData.withdraw.length + 1,
        amount: parseInt(amount),
        method: method,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
    });
    
    closeModal();
    showHistory('withdraw');
}

// History Functions
function showHistory(type) {
    const content = document.getElementById('historyContent');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.innerHTML.includes(type === 'deposit' ? 'Deposit' : 
                                    type === 'withdraw' ? 'Penarikan' : 'Profit')) {
            tab.classList.add('active');
        }
    });
    
    let html = '';
    
    historyData[type].forEach(item => {
        if (type === 'profit') {
            html += `
                <div class="history-item">
                    <div class="history-info">
                        <div class="history-icon">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="history-details">
                            <h4>Profit Paket ${item.package}</h4>
                            <p>${formatDate(item.date)}</p>
                        </div>
                    </div>
                    <div class="history-status">
                        <span class="amount" style="color: #4cc9f0;">+Rp ${formatNumber(item.amount)}</span>
                        <span class="status status-success">Selesai</span>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="history-item">
                    <div class="history-info">
                        <div class="history-icon">
                            <i class="fas ${type === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                        </div>
                        <div class="history-details">
                            <h4>${type === 'deposit' ? 'Deposit' : 'Penarikan'} via ${item.method}</h4>
                            <p>${formatDate(item.date)}</p>
                        </div>
                    </div>
                    <div class="history-status">
                        <span class="amount">Rp ${formatNumber(item.amount)}</span>
                        <span class="status status-${item.status}">
                            ${item.status === 'success' ? '✓ Berhasil' : '⏳ Pending'}
                        </span>
                    </div>
                </div>
            `;
        }
    });
    
    content.innerHTML = html;
}

// Live Chat Functions
function openLiveChat() {
    openModal('livechat');
}

function chatWith(type) {
    let message = '';
    let phone = '6281234567890'; // Ganti dengan nomor WhatsApp Anda
    
    switch(type) {
        case 'deposit':
            message = 'Halo%20saya%20mau%20lapor%20masalah%20deposit%0A%0A%2ADetail%20Masalah%3A%2A%0A-%20Nama%3A%0A-%20Jumlah%20Deposit%3A%0A-%20Metode%3A%0A-%20Bukti%20Transfer%3A%0A-%20Kendala%3A';
            break;
        case 'withdraw':
            message = 'Halo%20saya%20mau%20lapor%20masalah%20penarikan%0A%0A%2ADetail%20Masalah%3A%2A%0A-%20Nama%3A%0A-%20Jumlah%20Penarikan%3A%0A-%20Metode%3A%0A-%20Nomor%20Tujuan%3A%0A-%20Kendala%3A';
            break;
        case 'other':
            message = 'Halo%20saya%20butuh%20bantuan%0A%0A%2APertanyaan%20Saya%3A%2A%0A';
            break;
    }
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    closeModal();
}

// Utility Functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

function getTimeAgo() {
    const minutes = Math.floor(Math.random() * 5) + 1;
    return `${minutes} menit yang lalu`;
}

function updateUIAfterLogin() {
    const navAuth = document.querySelector('.nav-auth');
    navAuth.innerHTML = `
        <span style="margin-right: 15px; background: rgba(67, 97, 238, 0.2); padding: 5px 15px; border-radius: 20px;">
            <i class="fas fa-wallet"></i> Rp 500.000
        </span>
        <button class="btn-login" onclick="openModal('deposit')">
            <i class="fas fa-plus-circle"></i> Deposit
        </button>
        <button class="btn-register" onclick="openModal('withdraw')">
            <i class="fas fa-arrow-up"></i> Tarik
        </button>
    `;
}