using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Net;
using APIgamestore.Models;
using System.IO;

namespace APIgamestore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public GameController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env; 
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getGame", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(GameModel g)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                g.NgayTao = dateTime.ToString("yyyy/MM/dd HH:mm:ss");
                g.NgayCapNhat = dateTime.ToString("yyyy/MM/dd HH:mm:ss");


                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createGame", con);
                cmd.Parameters.Add(new SqlParameter("@Ten_Game", g.Ten_Game));
                cmd.Parameters.Add(new SqlParameter("@Ten_NhaSanXuat", g.Ten_NhaSanXuat));
                cmd.Parameters.Add(new SqlParameter("@SoHieuPhienBan", g.SoHieuPhienBan));
                cmd.Parameters.Add(new SqlParameter("@PhienBan", g.PhienBan));
                cmd.Parameters.Add(new SqlParameter("@YC_CauHinh", g.YC_CauHinh));
                g.LuotTaiXuong = 0;
                cmd.Parameters.Add(new SqlParameter("@LuotTaiXuong", g.LuotTaiXuong));
                g.DanhGiaTB = 0;
                cmd.Parameters.Add(new SqlParameter("@DanhGiaTB", g.DanhGiaTB));
                cmd.Parameters.Add(new SqlParameter("@GioiHan_Tuoi", g.GioiHan_Tuoi));
                cmd.Parameters.Add(new SqlParameter("@Gia", g.Gia));
                cmd.Parameters.Add(new SqlParameter("@MoTaChiTiet", g.MoTaChiTiet));
                cmd.Parameters.Add(new SqlParameter("@UserName_Tao", g.UserName_Tao));
                cmd.Parameters.Add(new SqlParameter("@NgayTao", g.NgayTao));
                cmd.Parameters.Add(new SqlParameter("@UserName_CapNhat", g.UserName_CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayCapNhat", g.NgayCapNhat));
                cmd.Parameters.Add(new SqlParameter("@Logo_Game", g.Logo_Game));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return new JsonResult("Thành công !!");
            }
            catch (Exception)
            {
                return new JsonResult("Không thành công !!");
            }
        }


        [HttpPut]
        public JsonResult Put(GameModel g)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                g.NgayCapNhat = dateTime.ToString("yyyy/MM/dd HH:mm:ss");


                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editGame", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Game", g.ID_Game));
                cmd.Parameters.Add(new SqlParameter("@Ten_Game", g.Ten_Game));
                cmd.Parameters.Add(new SqlParameter("@Ten_NhaSanXuat", g.Ten_NhaSanXuat));
                cmd.Parameters.Add(new SqlParameter("@SoHieuPhienBan", g.SoHieuPhienBan));
                cmd.Parameters.Add(new SqlParameter("@PhienBan", g.PhienBan));
                cmd.Parameters.Add(new SqlParameter("@YC_CauHinh", g.YC_CauHinh));
                cmd.Parameters.Add(new SqlParameter("@LuotTaiXuong", g.LuotTaiXuong));
                cmd.Parameters.Add(new SqlParameter("@DanhGiaTB", g.DanhGiaTB));
                cmd.Parameters.Add(new SqlParameter("@GioiHan_Tuoi", g.GioiHan_Tuoi));
                cmd.Parameters.Add(new SqlParameter("@Gia", g.Gia));
                cmd.Parameters.Add(new SqlParameter("@MoTaChiTiet", g.MoTaChiTiet));
                cmd.Parameters.Add(new SqlParameter("@UserName_CapNhat", g.UserName_CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayCapNhat", g.NgayCapNhat));
                cmd.Parameters.Add(new SqlParameter("@Logo_Game", g.Logo_Game));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return new JsonResult("Thành công !!");
            }
            catch (Exception)
            {
                return new JsonResult("Không thành công !!");
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("deleteGame", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return new JsonResult("Thành công !!");
            }
            catch (Exception)
            {
                return new JsonResult("Không thành công !!");
            }
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("detailGame", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }


        //chuyển ảnh vào thư mục Images (chọn file)
        [Route("/api/Game/SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            int index = Directory.GetFiles(Path.Combine(_env.ContentRootPath, "Images")).Length;
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = "logo" + (index + 1) + ".png";
                var physicalPath = _env.ContentRootPath + "/Images/" + filename;
                
                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("Không thành công");
            }
        }

        [Route("/api/Game/GetIDNameGame/{name}")]
        [HttpGet]
        public JsonResult GetIDNameTheLoai(string name)
        {
            string ID_Game = "error";
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getIDNameLogo", con);
            cmd.Parameters.Add(new SqlParameter("@Ten_Game", name));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                ID_Game = cmd.ExecuteScalar().ToString();
            con.Close();
            return new JsonResult( ID_Game);
        }

        
        [Route("/api/Game/updateDanhGia/{id}")]
        [HttpGet]
        public JsonResult updateDanhGia(int id)
        {
            //tinh danh gia tb
            float danhgiatb = 0;
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("countDanhGia", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                danhgiatb = float.Parse(cmd.ExecuteScalar().ToString());
            con.Close();

            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editGameDanhGia", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
                //cmd.Parameters.Add(new SqlParameter("@LuotTaiXuong", luotTai(id)));
                cmd.Parameters.Add(new SqlParameter("@DanhGiaTB", danhgiatb));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return new JsonResult( danhgiatb);
            }
            catch (Exception)
            {
                return new JsonResult("Không thành công !!");
            }
        }

        [Route("/api/Game/updateLuotTai/{id}")]
        [HttpGet]
        public JsonResult updateLuotTai(int id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editGameLuotTai", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return new JsonResult("Thành công !!");
            }
            catch (Exception)
            {
                return new JsonResult("Không thành công !!");
            }
        }

        [Route("/api/Game/findGame/{keyword}")]
        [HttpGet]
        public JsonResult findGame(string keyword)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("findGame", con);
            cmd.Parameters.Add(new SqlParameter("@keyword", keyword));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

        [Route("/api/Game/TopLuotTai")]
        [HttpGet]
        public JsonResult topLuotTai()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("topLuotTai", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        [Route("/api/Game/TopDanhGia")]
        [HttpGet]
        public JsonResult topDanhGia()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("topDanhGia", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        [Route("/api/Game/gameFree")]
        [HttpGet]
        public JsonResult gameFree()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("gameFree", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        [Route("/api/Game/TopGiaTien")]
        [HttpGet]
        public JsonResult topGiaTien()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("topGiaTien", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }
    }
}
