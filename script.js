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
    window.location.href = 'index.html'; 
}

// Xử lý sự kiện khi gửi Form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tempForm');
    const btn = document.getElementById('submitBtn');
    const inputThucTe = document.getElementById('nhietDoThucTe');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Kiểm tra giới hạn 340 - 380
        const tempValue = parseFloat(inputThucTe.value);
        if (tempValue < 340 || tempValue > 380) {
            alert("CẢNH BÁO: Nhiệt độ thực tế phải nằm trong khoảng từ 340°C đến 380°C!");
            inputThucTe.focus();
            return;
        }
        
        btn.disabled = true;
        btn.innerText = "Đang gửi...";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            await sendDataToGoogleSheet(data);
            alert("Gửi dữ liệu thành công!");
            form.reset();
        } catch (error) {
            console.error('Lỗi:', error);
            alert("Lỗi kết nối! Vui lòng thử lại.");
        } finally {
            btn.disabled = false;
            btn.innerText = "GỬI DỮ LIỆU";
        }
    });
});
