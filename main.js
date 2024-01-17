//ฟังก์ชันหลักที่ใช้ Fetch API เพื่อดึงข้อมูลจาก URL
function fetchDataAndPopulateTable() {
    let url = 'https://script.google.com/macros/s/AKfycbxbhYC1Q_jfll8dmokSqegzHQ4UjZ5lsL5rsqqNCuaAdhgoKmK5ngyLGLcCmOrsOL-f/exec';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            populateTable(json);
            // เวลารีเฟรซจะแสดง SweetAler ขึ้นมา
            Swal.fire({
                title: 'หน้าเว็บถูกรีเฟรชแล้ว',
                text: 'ข้อมูลได้รับการอัพเดตแล้ว',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            });
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
        const body = document.querySelector('body');
        body.classList.remove('dark-mode');
}
//ฟังก์ชันนำ API มาแสดงในตาราง
function populateTable(data) {
    let table = $('#example').DataTable();
    table.clear().draw();
    data.forEach(item => {
        table.row.add([
            item.ID,
            item.ชื่อ,
            item.ตำแหน่ง,
            item.จำนวน
        ]).draw(false);
    });
}

//ฟังก์ชันนี้จะทำงานเมื่อ HTML ได้โหลดเสร็จสมบูรณ์ และ responsive ให้ตารางปรับขนาด
$(document).ready(function() {
    // ตรวจสอบว่า DataTables ถูกเรียกใช้หรือยัง
    if (!$.fn.dataTable.isDataTable('#example')) {
        // ใช้ DataTables library และ responsive สำหรับตาราง
        $("#example").DataTable({
            responsive: true,
            //ภาษาไทย
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Thai.json"
            }
        });
        
    }
});

// ฟังก์ชันสำหรับเปลี่ยนโหมด
function changeMode() {
    const select = document.getElementById('modeSelect');
    const selectedMode = select.value;
    const body = document.body;

    // Save the selected mode to localStorage
    localStorage.setItem('selectedMode', selectedMode);

    // Call DarkMode function to apply selected mode
    DarkMode();

    // Set the selected value in modeSelect to stay unchanged
    select.value = localStorage.getItem('selectedMode');
}

// ฟังก์ชันสำหรับเปลี่ยนโหมดกลางคืน
function DarkMode() {
    const savedMode = localStorage.getItem('selectedMode');
    const body = document.querySelector('body');
    if (savedMode === 'night') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// ฟังก์ชันทำงานเมื่อ HTML ได้โหลดเสร็จสมบูรณ์
document.addEventListener('DOMContentLoaded', function () {
    DarkMode();
    document.getElementById('modeSelect').value = localStorage.getItem('selectedMode');
});