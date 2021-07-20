var nguoiDungService = new NguoiDungService();
function getEle(id) {
    return document.getElementById(id);
}

var layDanhSachND = function () {

    nguoiDungService.layDSND().then(function (result) {
        renderTeacher(result.data)
    }).catch(function (err) {
        console.log(err);
    })
};
layDanhSachND();
function renderTeacher(mangND) {
    var content = '';
    mangND.map(function (nd, index) {
        if(nd.loaiND === "GV"){
            content += `
        <div class="teacher__gridItem">
          <div class="teacher__image">
            <img src="../../assets/img/${nd.hinhAnh}" alt="">
          </div>
          <div class="teacher__info">
            <span>${nd.ngonNgu}</span>
            <h3>${nd.hoTen}</h3>
            <p>${nd.moTa}</p>
          </div>
        </div>
          `;
        }
    });
    getEle('teacherContent').innerHTML = content;
}