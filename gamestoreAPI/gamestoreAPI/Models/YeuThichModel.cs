using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gamestoreAPI.Models
{
    public class YeuThichModel
    {
        public int ID_YeuThich { get; set; }
        public string NgayThich { get; set; }
        public string ID_NguoiDung { get; set; }
        public int ID_Game { get; set; }
    }
}