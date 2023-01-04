using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using gamestoreAPI.Models;

namespace gamestoreAPI.Controllers
{
    public class GameController : ApiController
    {
        //get
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getGame", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        //create
        public string Post(GameModel g)
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


                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
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

                return "Thành công !!";
            }
            catch (Exception)
            {
                return "Không thành công !!";
            }
        }

        //edit
        public string Put(GameModel g)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                g.NgayCapNhat = dateTime.ToString("yyyy/MM/dd HH:mm:ss");


                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
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

                return "Thành công !!";
            }
            catch (Exception)
            {
                return "Không thành công !!";
            }
        }

        //delete
        public string Delete(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("deleteGame", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return "Thành công !!";
            }
            catch (Exception)
            {

                return "Không thành công !!";
            }
        }

        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("detailGame", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }



        public static int countHinhAnh()
        {
            int fileCount = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/Images")).Length;
            return fileCount;
        }

        //chuyển ảnh vào thư mục Images (chọn file)
        [Route("api/Game/SaveFile")]
        public string SaveFile()
        {
            int index = countHinhAnh();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                var physicalPath = HttpContext.Current.Server.MapPath("~/Images/" + "logo" + (index + 1) + ".png");
                string filename = "logo" + (index + 1) + ".png";

                postedFile.SaveAs(physicalPath);
                return filename;
            }
            catch (Exception)
            {
                return "Không thành công";
            }
        }

        [Route("api/Game/GetIDNameGame/{name}")]
        [HttpGet]
        public string GetIDNameTheLoai(string name)
        {
            string ID_Game = "error";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getIDNameLogo", con);
            cmd.Parameters.Add(new SqlParameter("@Ten_Game", name));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                ID_Game = cmd.ExecuteScalar().ToString();
            con.Close();
            return ID_Game;
        }


        
        public static float danhgiaTB(int id)
        {
            float danhgiatb = 0;
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("countDanhGia", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                danhgiatb = float.Parse(cmd.ExecuteScalar().ToString());
            con.Close();
            return danhgiatb;
        }

        public static int luotTai(int id)
        {
            int luottai = 0;
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("countGameDaTai", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                luottai = int.Parse(cmd.ExecuteScalar().ToString());
            con.Close();
            return luottai;
        }


        [Route("api/Game/updateDanhGia/{id}")]
        [HttpGet]
        public string updateDanhGia(int id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editGameDanhGia", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
                //cmd.Parameters.Add(new SqlParameter("@LuotTaiXuong", luotTai(id)));
                cmd.Parameters.Add(new SqlParameter("@DanhGiaTB", danhgiaTB(id)));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return "Thành công !!";
            }
            catch (Exception)
            {
                return "Không thành công !!";
            }
        }
        [Route("api/Game/updateLuotTai/{id}")]
        [HttpGet]
        public string updateLuotTai(int id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editGameLuotTai", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
                cmd.CommandType = CommandType.StoredProcedure;
                da.SelectCommand = cmd;
                da.Fill(dt);

                return "Thành công !!";
            }
            catch (Exception)
            {
                return "Không thành công !!";
            }
        }

        [Route("api/Game/findGame/{keyword}")]
        [HttpGet]
        public HttpResponseMessage findGame(string keyword)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("findGame", con);
            cmd.Parameters.Add(new SqlParameter("@keyword", keyword));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }


    }
}
