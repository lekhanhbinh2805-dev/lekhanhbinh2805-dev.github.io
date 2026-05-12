// 1. Khai báo URL và các phần tử DOM
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxo8UYy_RkT4Ia5EOnKLF20hSrjcQb6KFKswgDJEBM4cfkMuVDpHCRYn86WU3O9sUTk_A/exec';

const form = document.getElementById('tempForm');
const btnSubmit = document.getElementById('submitBtn');
const inputTongMau = document.getElementsByName('mauKiemTra')[0];
const inputMauDat = document.getElementsByName('mauDat')[0];
const inputMauLoi = document.getElementsByName('mauKhongDat')[0];
const nguyenNhanWrapper = document.getElementById('nguyenNhanWrapper');
const inputNguyenNhan = document.getElementById('nguyenNhanInput');

// 2. Hàm gửi dữ liệu lên Google Sheets
async function sendDataToGoogleSheet(data) {
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response;
}

// 3. Xử lý ẩn/hiện ô nguyên nhân lỗi linh hoạt
inputMauLoi.addEventListener('input', function() {
    const soLoi = parseInt(this.value) || 0;
    if (soLoi > 0) {
        nguyenNhanWrapper.classList.remove('hidden');
        inputNguyenNhan.setAttribute('required', 'true'); // Thêm required bằng code
    } else {
        nguyenNhanWrapper.classList.add('hidden');
        inputNguyenNhan.removeAttribute('required');
        inputNguyenNhan.value = ""; 
    }
});

// 4. Xử lý sự kiện Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tong = parseInt(inputTongMau.value) || 0;
    const dat = parseInt(inputMauDat.value) || 0;
    const loi = parseInt(inputMauLoi.value) || 0;
    const nguyenNhan = inputNguyenNhan.value.trim();

    // Kiểm tra tính toán số liệu
    if (tong !== (dat + loi)) {
        alert("❌ Số lượng không khớp!\nTổng mẫu (" + tong + ") phải bằng Đạt (" + dat + ") + Lỗi (" + loi + ").");
        return;
    }

    // Kiểm tra nguyên nhân nếu có lỗi
    if (loi > 0 && nguyenNhan === "") {
        alert("⚠️ Vui lòng nhập NGUYÊN NHÂN KHÔNG ĐẠT.");
        inputNguyenNhan.focus();
        return;
    }

    // Tiến hành gửi
    btnSubmit.disabled = true;
    btnSubmit.innerText = "⏳ Đang gửi dữ liệu...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        await sendDataToGoogleSheet(data);
        alert("✅ Gửi dữ liệu thành công!");
        form.reset();
        nguyenNhanWrapper.classList.add('hidden');
    } catch (error) {
        console.error('Lỗi:', error);
        alert("❌ Lỗi kết nối! Vui lòng kiểm tra Internet hoặc Web App URL.");
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "GỬI DỮ LIỆU";
    }
});

// 5. Các hàm điều hướng
function resetForm() {
    if(confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu đã nhập?")) {
        form.reset();
        nguyenNhanWrapper.classList.add('hidden');
    }
}

function goToMenu() {
    window.location.href = 'index.html'; 
}
