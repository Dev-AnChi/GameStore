namespace APIgamestore.Models
{
    public class GameModel
    {
        public int ID_Game { get; set; }
        public string Ten_Game { get; set; }
        public string Ten_NhaSanXuat { get; set; }
        public int SoHieuPhienBan { get; set; }
        public string PhienBan { get; set; }
        public string YC_CauHinh { get; set; }
        public int LuotTaiXuong { get; set; }
        public float DanhGiaTB { get; set; }
        public int GioiHan_Tuoi { get; set; }
        public float Gia { get; set; }
        public string MoTaChiTiet { get; set; }
        public string UserName_Tao { get; set; }
        public string NgayTao { get; set; }
        public string UserName_CapNhat { get; set; }
        public string NgayCapNhat { get; set; }
        public string Logo_Game { get; set; }
    }
}
