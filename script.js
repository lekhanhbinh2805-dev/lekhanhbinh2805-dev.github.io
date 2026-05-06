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

const mauLoiInput = document.getElementsByName('mauKhongDat')[0];
const nguyenNhanWrapper = document.getElementById('nguyenNhanWrapper');
const nguyenNhanInput = document.getElementById('nguyenNhanInput');

// 1. Xử lý ẩn/hiện khi nhập số lượng lỗi
mauLoiInput.addEventListener('input', function() {
    const soLoi = parseInt(this.value) || 0;
    
    if (soLoi > 0) {
        nguyenNhanWrapper.classList.remove('hidden');
    } else {
        nguyenNhanWrapper.classList.add('hidden');
        nguyenNhanInput.value = ""; // Xóa nội dung nếu người dùng quay lại nhập 0
    }
});

// 2. Chỉnh sửa logic trong sự kiện 'submit'
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tongMau = parseInt(document.getElementsByName('mauKiemTra')[0].value) || 0;
    const mauDat = parseInt(document.getElementsByName('mauDat')[0].value) || 0;
    const mauLoi = parseInt(mauLoiInput.value) || 0;
    const nguyenNhan = nguyenNhanInput.value.trim();

    // Kiểm tra khớp số lượng
    if (tongMau !== (mauDat + mauLoi)) {
        alert("❌ Số lượng không khớp! Tổng mẫu = Đạt + Không đạt.");
        return;
    }

    // Kiểm tra bắt buộc nhập nguyên nhân nếu có lỗi
    if (mauLoi > 0 && nguyenNhan === "") {
        alert("⚠️ Vui lòng nhập NGUYÊN NHÂN KHÔNG ĐẠT.");
        nguyenNhanInput.focus();
        return;
    }

    // Nếu mọi thứ OK -> Tiến hành gửi dữ liệu
    btn.disabled = true;
    btn.innerText = "Đang gửi...";
    
    // ... (Giữ nguyên đoạn code gửi fetch của bạn)
});
