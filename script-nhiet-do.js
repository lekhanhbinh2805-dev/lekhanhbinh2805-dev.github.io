const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxt8ZOfL-Eg2pKHkC7kDTyn1UlOfnQOHZLOZt5hHEqpg15WWhwTWtHd740_mf-ahJuwZw/exec';

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
        alert("❌ Lỗi kết nối! Vui lòng kiểm tra Internet.");
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "GỬI DỮ LIỆU";
    }
});

// 3. Hàm bổ trợ
function resetForm() {
    if(confirm("Xóa toàn bộ nội dung đã nhập?")) form.reset();
}

function goToMenu() {
    window.location.href = 'index.html'; 
}
