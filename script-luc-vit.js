const form = document.getElementById('tempForm');
const btn = document.getElementById('submitBtn');

// 1. Hàm gửi dữ liệu (Giả định cấu trúc script.js)
async function sendDataToGoogleSheet(data) {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxt8ZOfL-Eg2pKHkC7kDTyn1UlOfnQOHZLOZt5hHEqpg15WWhwTWtHd740_mf-ahJuwZw/exec"; 
    
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return response;
}

// 2. Xử lý sự kiện gửi form
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btn.disabled = true;
    btn.innerText = "Đang gửi...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        await sendDataToGoogleSheet(data);
        alert("✅ Gửi dữ liệu thành công!");
        form.reset();
    } catch (error) {
        console.error('Lỗi:', error);
        alert("❌ Lỗi kết nối! Vui lòng kiểm tra lại URL Apps Script hoặc mạng.");
    } finally {
        btn.disabled = false;
        btn.innerText = "GỬI DỮ LIỆU";
    }
});

// 3. Hàm Xóa dữ liệu
function resetForm() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ nội dung đã nhập?")) {
        form.reset();
    }
}

// 4. Hàm Quay về Menu
function goToMenu() {
    // Thay đổi link này tới trang chủ của bạn
    window.location.href = "index.html"; 
}
