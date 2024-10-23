// ข้อมูลสินค้าตัวอย่าง
const products = [
    {
        id: 1,
        title: "iPhone 12 Pro",
        description: "สภาพ 90% ใช้งานมา 1 ปี อยากเทรดกับ Android รุ่นใหม่ๆ",
        owner: "คุณมด",
        location: "กรุงเทพฯ",
        posted: "2 ชั่วโมงที่แล้ว"
    },
    {
        id: 2,
        title: "เสื้อแบรนด์ Uniqlo",
        description: "ของใหม่ ไซส์ L ใส่ไม่พอ อยากเทรดกับไซส์ XL",
        owner: "คุณนก",
        location: "นนทบุรี",
        posted: "3 ชั่วโมงที่แล้ว"
    }
];

// ข้อมูลสินค้าของฉัน
const myItems = [
    {
        id: 1,
        title: "iPhone 12 Pro",
        status: "active",
        image: "/api/placeholder/200/150"
    },
    {
        id: 2,
        title: "เสื้อแบรนด์ Uniqlo",
        status: "active",
        image: "/api/placeholder/200/150"
    },
    {
        id: 3,
        title: "หูฟัง Sony WH-1000XM4",
        status: "inactive",
        image: "/api/placeholder/200/150"
    }
];

// ข้อมูลการติดตาม
const trackingData = {
    1: {
        id: "TH1234567890",
        product: "iPhone 12 Pro แลกกับ Samsung S21",
        partner: "คุณนก",
        date: "23 ต.ค. 2024",
        image: "/api/placeholder/80/80",
        status: "shipping",
        timeline: [
            {
                status: "completed",
                title: "ยืนยันการแลกเปลี่ยน",
                time: "23 ต.ค. 2024, 10:00"
            },
            {
                status: "completed",
                title: "จัดส่งสินค้า",
                time: "23 ต.ค. 2024, 14:30"
            },
            {
                status: "active",
                title: "อยู่ระหว่างขนส่ง",
                time: "24 ต.ค. 2024, 09:15"
            },
            {
                status: "pending",
                title: "ได้รับสินค้า",
                time: "รอการยืนยัน"
            }
        ]
    },
    2: {
        id: "TH9876543210",
        product: "เสื้อ Uniqlo แลกกับ เสื้อ H&M",
        partner: "คุณกบ",
        date: "22 ต.ค. 2024",
        image: "/api/placeholder/80/80",
        status: "delivered",
        timeline: [
            {
                status: "completed",
                title: "ยืนยันการแลกเปลี่ยน",
                time: "22 ต.ค. 2024, 10:00"
            },
            {
                status: "completed",
                title: "จัดส่งสินค้า",
                time: "22 ต.ค. 2024, 11:30"
            },
            {
                status: "completed",
                title: "อยู่ระหว่างขนส่ง",
                time: "22 ต.ค. 2024, 14:15"
            },
            {
                status: "completed",
                title: "ได้รับสินค้า",
                time: "22 ต.ค. 2024, 16:30"
            }
        ]
    }
};

// แสดง Landing Page ตอนโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('landingPage').style.display = 'block';
    
    // เพิ่ม event listener สำหรับปุ่มนำทางด้านล่าง
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
            
            // อัพเดทการแสดง active state
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});

// ฟังก์ชันเริ่มต้นการเทรด
function startTrading() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    renderProducts();
}

// แสดงรายการสินค้า
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="/api/placeholder/400/300" alt="${product.title}">
                <button class="favorite-button">❤️</button>
            </div>
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-description">${product.description}</p>
                <div class="product-metadata">
                    <span>${product.owner}</span>
                    <span>📍 ${product.location}</span>
                    <span>${product.posted}</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="outline-button" onclick="openChat(${product.id})">💬 แชทเลย</button>
                <button class="primary-button">ข้อเสนอแลกเปลี่ยน</button>
            </div>
        </div>
    `).join('');
}

// แสดงสินค้าของฉัน
function renderMyItems() {
    const grid = document.getElementById('myItemsGrid');
    grid.innerHTML = myItems.map(item => `
        <div class="item-card">
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-status ${item.status === 'active' ? 'status-active' : 'status-inactive'}">
                    ${item.status === 'active' ? '🟢 เปิดรับแลกเปลี่ยน' : '🔴 ปิดรับแลกเปลี่ยน'}
                </div>
            </div>
        </div>
    `).join('');
}

// เลือกดูรายละเอียดการติดตาม
function selectTracking(id) {
    // ซ่อนรายการทั้งหมด
    document.querySelector('.tracking-list').style.display = 'none';
    
    // แสดงปุ่มย้อนกลับ
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = '← กลับไปหน้ารายการ';
    backButton.onclick = function() {
        document.querySelector('.tracking-list').style.display = 'block';
        document.getElementById('tracking-detail').style.display = 'none';
        this.remove();
    };
    document.querySelector('.tracking-page').prepend(backButton);

    // แสดงรายละเอียด
    const detail = document.getElementById('tracking-detail');
    const data = trackingData[id];
    if (data) {
        updateTrackingDetail(data);
    }
    detail.style.display = 'block';
}

// อัพเดทข้อมูลในหน้ารายละเอียดการติดตาม
function updateTrackingDetail(data) {
    document.querySelector('.product-details h3').textContent = data.product;
    document.querySelector('.product-details p:first-of-type').textContent = `แลกเปลี่ยนกับ: ${data.partner}`;
    document.querySelector('.product-details p:last-of-type').textContent = `วันที่: ${data.date}`;
    document.querySelector('.tracking-number .number').textContent = data.id;

    // อัพเดท timeline
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = data.timeline.map(item => `
        <div class="timeline-item ${item.status}">
            <div class="timeline-content">
                ${item.status !== 'pending' ? 
                    `<span class="status ${item.status === 'completed' ? 'success' : 'pending'}">
                        ${item.status === 'completed' ? 'สำเร็จ' : 'กำลังดำเนินการ'}
                    </span>` 
                    : ''
                }
                <h4>${item.title}</h4>
                <p>${item.time}</p>
            </div>
        </div>
    `).join('');
}

// ฟังก์ชันเปลี่ยนหน้า
function switchTab(tabId) {
    document.querySelector('.product-list').style.display = 'none';
    document.getElementById('profilePage').style.display = 'none';
    document.getElementById('trackingPage').style.display = 'none';
    document.getElementById('chatPage').style.display = 'none';
    
    switch(tabId) {
        case 'home':
            document.querySelector('.product-list').style.display = 'block';
            renderProducts();
            break;
        case 'profile':
            document.getElementById('profilePage').style.display = 'block';
            renderMyItems();
            break;
        case 'tracking':
            document.getElementById('trackingPage').style.display = 'block';
            // รีเซ็ตการแสดงผลเป็นหน้ารายการ
            document.querySelector('.tracking-list').style.display = 'block';
            document.getElementById('tracking-detail').style.display = 'none';
            // ลบปุ่มย้อนกลับถ้ามี
            const backButton = document.querySelector('.back-button');
            if (backButton) backButton.remove();
            break;
        case 'chat':
            document.getElementById('chatPage').style.display = 'block';
            break;
    }
}

// จัดการการอัพโหลดรูปภาพในแชท
let selectedImage = null;

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImage = e.target.result;
            showImagePreview(selectedImage);
            document.querySelector('.send-button').disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

function showImagePreview(imageUrl) {
    const preview = document.getElementById('imagePreview');
    preview.style.display = 'block';
    preview.innerHTML = `
        <div class="preview-container">
            <img src="${imageUrl}" alt="Preview">
            <button class="remove-preview" onclick="removeImage()">✕</button>
        </div>
    `;
}

function removeImage() {
    selectedImage = null;
    const preview = document.getElementById('imagePreview');
    preview.style.display = 'none';
    preview.innerHTML = '';
    document.querySelector('.send-button').disabled = !document.querySelector('textarea').value.trim();
}

// จัดการการอัพโหลดรูปโปรไฟล์
function uploadProfileImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.querySelector('.profile-image img').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Modal functions
function openAddItemModal() {
    document.getElementById('addItemModal').style.display = 'flex';
}

function closeAddItemModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

// Dialog functions
function openChat(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('selectedProduct').innerHTML = `
            <div class="product-card">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>โดย ${product.owner}</p>
                </div>
            </div>
        `;
        document.getElementById('chatDialog').style.display = 'flex';
    }
}

function closeDialog() {
    document.getElementById('chatDialog').style.display = 'none';
}