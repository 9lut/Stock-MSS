//ฟังก์ชันหลักที่ใช้ Fetch API เพื่อดึงข้อมูลจาก URL
function fetchDataAndPopulateTable() {
    let url = 'https://api.sheety.co/a2e1b386ad82786965d415a6f08beb8f/ของในห้องชรม/data';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            populateTable(json.data);
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
            item.id,
            item.ชื่อ,
            item.ตำแหน่ง,
            item.จำนวน
        ]).draw(false);
    });
}

//ฟังก์ชันนี้จะทำงานเมื่อ HTML ได้โหลดเสร็จสมบูรณ์ และ responsive ให้ตารางปรับขนาด
$(document).ready(function() {
    if (!$.fn.dataTable.isDataTable('#example')) {
        $("#example").DataTable({
            responsive: true
        });
    }
});

