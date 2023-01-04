using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gamestoreAPI.Models
{
    public class MenuModel
    {
        public int ID_Menu { get; set; }
        public string TenMenu { get; set; }
        public string IconMenu { get; set; }
        public string MoTa { get; set; }
        public int ID_MenuCha { get; set; }
    }
}