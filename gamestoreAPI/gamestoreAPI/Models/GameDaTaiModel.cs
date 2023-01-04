using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gamestoreAPI.Models
{
    public class GameDaTaiModel
    {
        public int ID_GameDaTai { get; set; }
        public bool CapNhat { get; set; }
        public string NgayTai { get; set; }
        public string ID_NguoiDung { get; set; }
        public int ID_Game { get; set; }

    }
}