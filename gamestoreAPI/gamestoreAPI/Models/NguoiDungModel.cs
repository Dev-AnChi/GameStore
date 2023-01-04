using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gamestoreAPI.Models
{
    public class NguoiDungModel
    {
        public string ID_NguoiDung { get; set; }
        public string NickName { get; set; }
        public string UserName_ND { get; set; }
        public string Password_ND { get; set; }
        public string TenNguoiDung { get; set; }
        public bool GioiTinh { get; set; }
        public string NgaySinh { get; set; }
        public string Email { get; set; }
        public string DiaChi { get; set; }
        public string SDT { get; set; }
        public string AnhDaiDien { get; set; }
        public string UserName_Tao { get; set; }
        public string NgayTao { get; set; }
        public string UserName_CapNhat { get; set; }
        public string NgayCapNhat { get; set; }
        public string ID_NhomChucNang { get; set; }
    }
}