const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxt8ZOfL-Eg2pKHkC7kDTyn1UlOfnQOHZLOZt5hHEqpg15WWhwTWtHd740_mf-ahJuwZw/exec';

const form = document.getElementById('tempForm');
const btnSubmit = document.getElementById('submitBtn');

// 1. Hàm gửi dữ liệu
async function sendDataToGoogleSheet(data) {
    // Thêm thời gian thực tế từ máy người dùng
    data.timestamp = new Date().toLocaleString("vi-VN");
    
    await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// 2. Xử lý sự kiện Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Trạng thái chờ
    btnSubmit.disabled = true;
    btnSubmit.innerText = "⏳ Đang gửi dữ liệu...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        await sendDataToGoogleSheet(data);
        alert("✅ Gửi dữ liệu thành công!");
        form.reset();
    } catch (error) {
        console.error('Lỗi:', error);
        alert("❌ Lỗi kết nối! Vui lòng kiểm tra Internet.");
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "GỬI DỮ LIỆU";
    }
});

// 3. Hàm bổ trợ
function resetForm() {
    if(confirm("Xóa toàn bộ nội dung đã nhập?")) form.reset();
}

function goToMenu() {
    window.location.href = 'index.html'; 
}
