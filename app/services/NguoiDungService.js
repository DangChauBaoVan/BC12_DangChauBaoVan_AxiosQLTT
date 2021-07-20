function NguoiDungService() {
    this.layDSND = function () {
        return axios({
            url: 'https://60eb92b0e9647b0017cddd6c.mockapi.io/nguoiDung',
            method: 'GET',
        });
    }
    this.themND = function (nd) {
        return axios({
            url: 'https://60eb92b0e9647b0017cddd6c.mockapi.io/nguoiDung',
            method: 'POST',
            data: nd,
        });
    }
    this.xoaND = function (id) {
        // DELETE: xoá data thông qua id
        return axios({
            url: `https://60eb92b0e9647b0017cddd6c.mockapi.io/nguoiDung/${id}`,
            method: 'DELETE',
        })
    }
    this.xemND = function (id) {
        // GET: lấy data của 1 sản phẩm dựa vào id
        return axios({
            url: `https://60eb92b0e9647b0017cddd6c.mockapi.io/nguoiDung/${id}`,
            method: 'GET',
        })
    }
    this.capNhatND = function (id, nd) {
        return axios({
            url: `https://60eb92b0e9647b0017cddd6c.mockapi.io/nguoiDung/${id}`,
            method: 'PUT',
            data: nd,
        })
    }
}