// Thay link này bằng URL Web App từ Google Apps Script của bạn
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxt8ZOfL-Eg2pKHkC7kDTyn1UlOfnQOHZLOZt5hHEqpg15WWhwTWtHd740_mf-ahJuwZw/exec';

//------------------------------------XỬ LÝ CÁC NÚT NHẤN--------------------------------
async function sendDataToGoogleSheet(data) {
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Quan trọng để tránh lỗi CORS khi dùng Google Script
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response;
}

function resetForm() {
    if(confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu đã nhập?")) {
        document.getElementById('tempForm').reset();
    }
}

function goToMenu() {
    // Chuyển hướng về trang chủ hoặc menu
    window.location.href = 'index.html'; 
}
//------------------------------------XỬ LÝ SỐ LIỆU CÁC Ô ĐẠT, KHÔNG ĐẠT, NGUYÊN NHÂN--------------------------------
const mauTong = parseInt(data.mauKiemTra);
const mauDat = parseInt(data.mauDat);
const mauLoi = parseInt(data.mauKhongDat || 0);

if (mauDat + mauLoi !== mauTong) {
    alert("Lỗi: Tổng số mẫu Đạt và Không đạt phải bằng Số lượng mẫu kiểm tra!");
    btn.disabled = false;
    btn.innerText = "GỬI DỮ LIỆU";
    return;
}
