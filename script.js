// Cấu hình URL Web App của bạn
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxKH2sCNC7AEZTNymUOFHt_irX5uHj-nQHaOJii5BTNLVbhdt7lT_mlVIUC3x1aPNlWCg/exec';

/**
 * Hàm gửi dữ liệu lên Google Sheets
 * @param {Object} data - Dữ liệu từ form
 * @returns {Promise}
 */
async function sendDataToGoogleSheet(data) {
    return fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

/**
 * Hàm điều hướng về Menu
 */
function goToMenu() {
    window.location.href = 'index.html'; 
}

/**
 * Hàm xóa dữ liệu form
 * @param {HTMLFormElement} form 
 */
function resetForm(form) {
    if (confirm("Bạn có muốn xóa toàn bộ thông tin đã nhập không?")) {
        form.reset();
    }
}
