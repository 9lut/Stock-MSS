//ฟังก์ชันหลักที่ใช้ Fetch API เพื่อดึงข้อมูลจาก URL
function fetchDataAndPopulateTable() {
    let url = 'https://script.google.com/macros/s/AKfycbyvLCkU0uRrWFrukTSANKowu2TbL0MM6O5Fl6iv_-4T4I0OqNRu_sOieULJEj0urCpJjw/exec';
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
            responsive: true
        });
    }
});

