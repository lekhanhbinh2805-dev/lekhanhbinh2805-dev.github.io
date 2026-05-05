// Thay link này bằng URL Web App từ Google Apps Script của bạn
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxt8ZOfL-Eg2pKHkC7kDTyn1UlOfnQOHZLOZt5hHEqpg15WWhwTWtHd740_mf-ahJuwZw/exec';

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
const form = document.getElementById('tempForm');
const btn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Lấy giá trị từ các ô nhập liệu
    const tongMau = parseInt(document.getElementsByName('mauKiemTra')[0].value) || 0;
    const mauDat = parseInt(document.getElementsByName('mauDat')[0].value) || 0;
    const mauLoi = parseInt(document.getElementsByName('mauKhongDat')[0].value) || 0;

    // 2. Kiểm tra logic toán học
    if (tongMau !== (mauDat + mauLoi)) {
        alert(`❌ Dữ liệu không khớp!\nTổng mẫu (${tongMau}) phải bằng Mẫu đạt (${mauDat}) + Mẫu lỗi (${mauLoi}).\nVui lòng kiểm tra lại!`);
        return; // Dừng lại không gửi dữ liệu
    }

    // 3. Nếu khớp thì tiến hành gửi dữ liệu
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
        alert("Lỗi kết nối! Vui lòng thử lại.");
    } finally {
        btn.disabled = false;
        btn.innerText = "GỬI DỮ LIỆU";
    }
});
