// Thay link này bằng URL Web App từ Google Apps Script của bạn
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKH2sCNC7AEZTNymUOFHt_irX5uHj-nQHaOJii5BTNLVbhdt7lT_mlVIUC3x1aPNlWCg/exec';

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
