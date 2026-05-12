const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxo8UYy_RkT4Ia5EOnKLF20hSrjcQb6KFKswgDJEBM4cfkMuVDpHCRYn86WU3O9sUTk_A/exec';

const form = document.getElementById('tempForm');
const btnSubmit = document.getElementById('submitBtn');

// 1. Hàm gửi dữ liệu
async function sendDataToGoogleSheet(data) {
    data.timestamp = new Date().toLocaleString("vi-VN");
    
    await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// 2. Xử lý sự kiện Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Chuyển giá trị nhiệt độ thực tế sang số để kiểm tra
    const thucTe = parseFloat(data.nhietDoThucTe);

    // MỚI: Kiểm tra nhiệt độ thực tế nằm trong khoảng [340, 380]
    if (isNaN(thucTe) || thucTe < 340 || thucTe > 380) {
        alert("⚠️ Nhiệt độ thực tế không hợp lệ! (Phải từ 340°C đến 380°C)");
        form.nhietDoThucTe.focus(); // Đưa con trỏ vào ô nhập lỗi
        return; // Dừng không gửi dữ liệu
    }

    // Trạng thái chờ
    btnSubmit.disabled = true;
    btnSubmit.innerText = "⏳ Đang gửi dữ liệu...";

    try {
        await sendDataToGoogleSheet(data);
        alert("✅ Gửi dữ liệu thành công!");
        form.reset();
    } catch (error) {
        console.error('Lỗi:', error);
        alert("❌ Lỗi kết nối! Vui lòng kiểm tra lại.");
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "GỬI DỮ LIỆU";
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

const selectBoPhan = document.querySelector('select[name="boPhan"]');
const inputNguoiThucHien = document.querySelector('input[name="nguoiThucHien"]');

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
