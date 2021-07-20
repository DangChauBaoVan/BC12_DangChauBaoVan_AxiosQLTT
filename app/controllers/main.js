var nguoiDungService = new NguoiDungService();
var validator = new Validator();
function getEle(id) {
    return document.getElementById(id);
}
var elements = document.getElementsByClassName('sp-thongbao'); // get all elements
for (var i = 0; i < elements.length; i++) {
    elements[i].style.color = "red";
}
var layDanhSachND = function () {

    nguoiDungService.layDSND().then(function (result) {
        renderTable(result.data);
        setLocalStorage(result.data);
    })
};
function setLocalStorage(dsnd) {
    localStorage.setItem('DSND', JSON.stringify(dsnd));
}

function getLocalStorage() {
    if (localStorage.getItem('DSND')) {
        return JSON.parse(localStorage.getItem('DSND'));
    }
}
layDanhSachND();

function renderTable(mangND) {
    var content = '';
    mangND.map(function (nd, index) {
        content += `
              <tr>
                  <td>${index + 1}</td>
                  <td>${nd.taiKhoan}</td>
                  <td>
                  <img style="width: 100px; height: 70px" src="../../assets/img/${nd.hinhAnh}">
                  </td>
                  <td>${nd.hoTen}</td>
                  <td>${nd.email}</td>
                  <td>${nd.ngonNgu}</td>
                  <td>${nd.loaiND}</td>
                  <td>${nd.moTa}</td>
                  <td>
                      <button class="btn btn-danger" onclick="xoaNguoiDung('${nd.id
            }')">Xoá</button>
                      <button class="btn btn-success" onclick="xemNguoiDung('${nd.id
            }')">Xem</button>
                  </td>
              </tr>
          `;
    });
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}

var themND = function () {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    console.log(ngonNgu)

    isValid = true;
    var dsnd = getLocalStorage();
    isValid &= validator.kiemTraRong(taiKhoan, "tbTKND", "(*) Tài khoản không được để trống!") && validator.kiemTraTaiKhoanTonTai(taiKhoan, dsnd, "tbTKND", "(*) Tên tài khoản đã tồn tại!");

    isValid &= validator.kiemTraRong(hoTen, "tbHoTen", "(*) Tên không được để trống!") && validator.kiemTraChuoi(hoTen, "tbHoTen", "(*) Tên không được chứa số và kí tự đặc biệt!");

    isValid &= validator.kiemTraRong(matKhau, "tbMatKhau", "(*) Mật khẩu không được để trống!") && validator.kiemTraPass(matKhau, "tbMatKhau", "(*) Password từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) ");

    isValid &= validator.kiemTraRong(email, "tbEmail", "(*) Email không được để trống!") && validator.kiemTraEmail(email, "tbEmail", "(*) Email không đúng định dạng (VD: abc@gmail.com)");

    isValid &= validator.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Hình ảnh không được để trống!");

    isValid &= validator.kiemTraLoaiND(loaiND, "tbLoaiND", "(*) Chưa chọn loại người dùng!");

    isValid &= validator.kiemTraLoaiNN(ngonNgu, "tbNgonNgu", "(*) Chưa chọn ngôn ngữ!");

    isValid &= validator.kiemTraRong(moTa, "tbMoTa", "(*) Mô tả không được để trống!") && validator.kiemTraMoTa(moTa, 1, 60, "tbMoTa", "(*) Mô tả tối đa 60 kí tự")

    if (!isValid) return;

    var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    $('#myModal').modal('hide');
    swal({
        title: "Thêm Thành Công!",
        icon: "success",
    });
    nguoiDungService.themND(nd).then(function (result) {
        layDanhSachND();
    }).catch(function (error) {
        console.log(error);
    })
}
getEle("btnThemNguoiDung").addEventListener('click', function () {
    getEle('formND').reset();
    var elements = document.getElementsByClassName('sp-thongbao'); // get all elements
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class="btn btn-success" onclick="themND()">Thêm người dùng</button>`;
})

var xoaNguoiDung = function (id) {
    nguoiDungService.xoaND(id).then(function (result) {
        swal({
            title: "Xóa Thành Công!",
            icon: "success",
        });
        layDanhSachND();
    }).catch(function (error) {
        console.log(error);
    })

};
var xemNguoiDung = function (id) {
    nguoiDungService.xemND(id).then(function (result) {
        var nd = result.data;
        getEle("btnThemNguoiDung").click();

        getEle("TaiKhoan").value = nd.taiKhoan;
        getEle("HoTen").value = nd.hoTen;
        getEle("MatKhau").value = nd.matKhau;
        getEle("Email").value = nd.email;
        getEle("HinhAnh").value = nd.hinhAnh;
        getEle("loaiNguoiDung").value = nd.loaiND;
        getEle("loaiNgonNgu").value = nd.ngonNgu;
        getEle("MoTa").value = nd.moTa;

        var modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = `<button class="btn btn-success" onclick="capNhatND('${nd.id}')">Cập nhật</button>`;
    }).catch(function (error) {
        console.log(error);
    })

};
var capNhatND = function (id) {

    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    isValid = true;
    
    isValid &= validator.kiemTraRong(taiKhoan, "tbTKND", "(*) Tài khoản không được để trống!") ;

    isValid &= validator.kiemTraRong(hoTen, "tbHoTen", "(*) Tên không được để trống!") && validator.kiemTraChuoi(hoTen, "tbHoTen", "(*) Tên không được chứa số và kí tự đặc biệt!");

    isValid &= validator.kiemTraRong(matKhau, "tbMatKhau", "(*) Mật khẩu không được để trống!") && validator.kiemTraPass(matKhau, "tbMatKhau", "(*) Password từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) ");

    isValid &= validator.kiemTraRong(email, "tbEmail", "(*) Email không được để trống!") && validator.kiemTraEmail(email, "tbEmail", "(*) Email không đúng định dạng (VD: abc@gmail.com)");

    isValid &= validator.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Hình ảnh không được để trống!");

    isValid &= validator.kiemTraLoaiND(loaiND, "tbLoaiND", "(*) Chưa chọn loại người dùng!");

    isValid &= validator.kiemTraLoaiNN(ngonNgu, "tbNgonNgu", "(*) Chưa chọn ngôn ngữ!");

    isValid &= validator.kiemTraRong(moTa, "tbMoTa", "(*) Mô tả không được để trống!") && validator.kiemTraMoTa(moTa, 1, 60, "tbMoTa", "(*) Mô tả tối đa 60 kí tự")

    if (!isValid) return;

    var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

    
    nguoiDungService.capNhatND(id, nd).then(function (result) {
        layDanhSachND();
        $('#myModal').modal('hide');
        swal({
            title: "Cập Nhật Thành Công!",
            icon: "success",
        });
    }).catch(function (error) {
        console.log(error);
    })
        
};