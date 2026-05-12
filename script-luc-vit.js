const form = document.getElementById('tempForm');
const btn = document.getElementById('submitBtn');

// 1. Hàm gửi dữ liệu (Giả định cấu trúc script.js)
async function sendDataToGoogleSheet(data) {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxo8UYy_RkT4Ia5EOnKLF20hSrjcQb6KFKswgDJEBM4cfkMuVDpHCRYn86WU3O9sUTk_A/exec"; 
    
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return response;
}

// 2. Xử lý sự kiện gửi form
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btn.disabled = true;
    btn.innerText = "⏳ Đang gửi dữ liệu...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        await sendDataToGoogleSheet(data);
        alert("✅ Gửi dữ liệu thành công!");
        form.reset();
    } catch (error) {
        console.error('Lỗi:', error);
        alert("❌ Lỗi kết nối! Vui lòng kiểm tra lại.");
    } finally {
        btn.disabled = false;
        btn.innerText = "GỬI DỮ LIỆU";
    }
});

// 3. Hàm Xóa dữ liệu
function resetForm() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ nội dung đã nhập?")) {
        form.reset();
    }
}

// 4. Hàm Quay về Menu
function goToMenu() {
    // Thay đổi link này tới trang chủ của bạn
    window.location.href = "index.html"; 
}
// 5. Danh sách người thực hiện mặc định theo bộ phận
const danhSachMacDinh = {
    "GCBM": "Thanh Tuấn",
    "LR": "Thanh Thủy",
    "KĐ3P": "Đắc Sơn",
    "KĐ1P": "Đức Phong",
    "KTSX": "Tấn Mẫn"
};

const selectBoPhan = document.querySelector('select[name="boPhan1"]');
const inputNguoiThucHien = document.querySelector('input[name="nguoiThucHien1"]');

// 6. Lắng nghe sự kiện thay đổi lựa chọn bộ phận
selectBoPhan.addEventListener('change', function() {
    const boPhanDaChon = this.value;
    
    // Nếu có tên trong danh sách mặc định thì điền vào
    if (danhSachMacDinh[boPhanDaChon]) {
        inputNguoiThucHien.value = danhSachMacDinh[boPhanDaChon];
    } else {
        inputNguoiThucHien.value = ""; // Xóa trống nếu chọn "-- Chọn bộ phận --"
    }
});
