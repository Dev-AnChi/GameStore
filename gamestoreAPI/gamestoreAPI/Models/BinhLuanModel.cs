using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gamestoreAPI.Models
{
    public class BinhLuanModel
    {
        public int ID_BinhLuan { get; set; }
        public int DanhGia { get; set; }
        public string NoiDungBL { get; set; }
        public string NgayBinhLuan { get; set; }
        public string ID_NguoiBinhLuan { get; set; }
        public int ID_Game { get; set; }
    }
}