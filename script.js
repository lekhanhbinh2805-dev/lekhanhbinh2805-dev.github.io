// Link URL Web App từ Google Apps Script 
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
