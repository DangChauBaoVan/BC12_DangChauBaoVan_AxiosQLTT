function Validator(){
    this.kiemTraRong = function (value, spanId, mess) {
        if (!value) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }

        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.kiemTraTaiKhoan = function (value, spanId,mess){
        var pattern = new RegExp("^\S*$");
        if(pattern.test(value)){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.kiemTraTaiKhoanTonTai = function (value,dsnd ,spanId,mess){
        flag = true;
        dsnd.map(function (nd, index) {
            if(value === nd.taiKhoan){
                getEle(spanId).style.display = 'block';
                getEle(spanId).innerHTML = mess;
                flag = false;
            }
            
        })
        if(!flag) return flag;
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return flag;
    }
    this.kiemTraChuoi = function (value, spanId, mess) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        if (pattern.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraPass = function (value, spanId, mess) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (value.match(pattern)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraEmail = function (value, spanId, mess) {
        var pattern = new RegExp("^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$");
        if (pattern.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraLoaiND = function (value, spanId, mess) {
        if(value === "GV" || value === "HV"){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;

    }
    this.kiemTraLoaiNN = function (value, spanId, mess) {
        if(value != "Chọn ngôn ngữ" ){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraMoTa = function (value,min,max, spanId, mess) {
        if(value.length >= min && value.length<= max){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
}