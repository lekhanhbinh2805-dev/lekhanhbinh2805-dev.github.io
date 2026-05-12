// 1. Cấu hình chung
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz58w1zA8qCHofxViNR3uDlyQXLsNxBgKtZu52N84HCRd8JHRWMsLgR0zhFrzydWuhkag/exec';

const danhSachMacDinh = {
    "GCBM": "Thanh Tuấn",
    "LR": "Thanh Thủy",
    "KĐ3P": "Đắc Sơn",
    "KĐ1P": "Đức Phong",
    "KTSX": "Tấn Mẫn"
};

// 2. Khai báo các phần tử DOM (Dùng querySelector để linh hoạt)
const form = document.getElementById('tempForm');
const btnSubmit = document.getElementById('submitBtn');
const selectBoPhan = document.querySelector('select[name="boPhan"]');
const inputNguoiThucHien = document.querySelector('input[name="nguoiThucHien"]');
const inputMauLoi = document.getElementsByName('mauKhongDat')[0];
const nguyenNhanWrapper = document.getElementById('nguyenNhanWrapper');

// --- CÁC HÀM XỬ LÝ CHÍNH ---

// Hàm gửi dữ liệu lên Google Sheets
async function sendDataToGoogleSheet(data) {
    data.timestamp = new Date().toLocaleString("vi-VN");
    return fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// Logic 1: Tự động điền tên theo bộ phận (Nếu có)
if (selectBoPhan && inputNguoiThucHien) {
    selectBoPhan.addEventListener('change', function() {
        inputNguoiThucHien.value = danhSachMacDinh[this.value] || "";
    });
}

// Logic 2: Ẩn/Hiện ô Nguyên nhân lỗi (Nếu có)
if (inputMauLoi && nguyenNhanWrapper) {
    inputMauLoi.addEventListener('input', function() {
        const soLoi = parseInt(this.value) || 0;
        const inputNguyenNhan = document.getElementById('nguyenNhanInput');
        
        if (soLoi > 0) {
            nguyenNhanWrapper.classList.remove('hidden');
            if (inputNguyenNhan) inputNguyenNhan.required = true;
        } else {
            nguyenNhanWrapper.classList.add('hidden');
            if (inputNguyenNhan) {
                inputNguyenNhan.required = false;
                inputNguyenNhan.value = "";
            }
        }
    });
}

// Logic 3: Xử lý sự kiện Submit Form
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // --- VALIDATION (KIỂM TRA DỮ LIỆU) ---

        // A. Kiểm tra nhiệt độ thực tế (Chỉ chạy nếu trang có ô này)
        if (data.nhietDoThucTe) {
            const thucTe = parseFloat(data.nhietDoThucTe);
            if (isNaN(thucTe) || thucTe < 340 || thucTe > 380) {
                alert("⚠️ Nhiệt độ thực tế không hợp lệ! (340°C - 380°C)");
                form.nhietDoThucTe.focus();
                return;
            }
        }

        // B. Kiểm tra khớp số lượng mẫu
        if (data.mauKiemTra && data.mauDat) {
            const tong = parseInt(data.mauKiemTra) || 0;
            const dat = parseInt(data.mauDat) || 0;
            const loi = parseInt(data.mauKhongDat) || 0;
            if (tong !== (dat + loi)) {
                alert("❌ Mẫu đạt ${dat} + Mẫu không đạt ${loi}) phải bằng Mẫu kiểm tra (${tong}");
                return;
            }
        }

        // --- TIẾN HÀNH GỬI ---
        btnSubmit.disabled = true;
        const originalBtnText = btnSubmit.innerText;
        btnSubmit.innerText = "⏳ Đang gửi...";

        try {
            await sendDataToGoogleSheet(data);
            alert("✅ Gửi dữ liệu thành công!");
            
            // Lưu lại tên người thực hiện trước khi reset
            const currentNguoi = inputNguoiThucHien ? inputNguoiThucHien.value : "";
            form.reset();
            if (inputNguoiThucHien) inputNguoiThucHien.value = currentNguoi;
            if (nguyenNhanWrapper) nguyenNhanWrapper.classList.add('hidden');
            
        } catch (error) {
            alert("❌ Lỗi kết nối! Vui lòng thử lại.");
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerText = originalBtnText;
        }
    });
}

// --- CÁC HÀM ĐIỀU HƯỚNG ---
function resetForm() {
    if (confirm("Bạn có chắc chắn muốn xóa dữ liệu hiện tại?")) {
        form.reset();
        if (nguyenNhanWrapper) nguyenNhanWrapper.classList.add('hidden');
    }
}

function goToMenu() {
    window.location.href = "index.html";
}
