using gamestoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace gamestoreAPI.Controllers
{
    public class NguoiDungController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getNguoiDung", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        public static string createIDNguoiDung()
        {
            Int32 count;
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("countNguoiDung", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            count = (Int32)cmd.ExecuteScalar();
            con.Close();
            return "ND" + (count + 1).ToString();
        }
        //create
        public string Post(NguoiDungModel nd)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                nd.NgayTao = dateTime.ToString("yyyy/MM/dd HH:mm:ss");
                nd.NgayCapNhat = dateTime.ToString("yyyy/MM/dd HH:mm:ss");
                nd.ID_NguoiDung = createIDNguoiDung();

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("createNguoiDung", con);
                
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", nd.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@NickName", nd.NickName));
                cmd.Parameters.Add(new SqlParameter("@UserName_ND", nd.UserName_ND));
                cmd.Parameters.Add(new SqlParameter("@Password_ND", nd.Password_ND));
                cmd.Parameters.Add(new SqlParameter("@TenNguoiDung", nd.TenNguoiDung));
                cmd.Parameters.Add(new SqlParameter("@GioiTinh", nd.GioiTinh));
                cmd.Parameters.Add(new SqlParameter("@NgaySinh", nd.NgaySinh));
                cmd.Parameters.Add(new SqlParameter("@Email", nd.Email));
                cmd.Parameters.Add(new SqlParameter("@DiaChi", nd.DiaChi));
                cmd.Parameters.Add(new SqlParameter("@SDT", nd.SDT));
                cmd.Parameters.Add(new SqlParameter("@AnhDaiDien", nd.AnhDaiDien));
                cmd.Parameters.Add(new SqlParameter("@UserName_Tao", nd.UserName_Tao));
                cmd.Parameters.Add(new SqlParameter("@NgayTao", nd.NgayTao));
                cmd.Parameters.Add(new SqlParameter("@UserName_CapNhat", nd.UserName_CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayCapNhat", nd.NgayCapNhat));
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", nd.ID_NhomChucNang));
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
        public string Put(NguoiDungModel nd)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                nd.NgayCapNhat = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editNguoiDung", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", nd.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@NickName", nd.NickName));
                cmd.Parameters.Add(new SqlParameter("@UserName_ND", nd.UserName_ND));
                cmd.Parameters.Add(new SqlParameter("@Password_ND", nd.Password_ND));
                cmd.Parameters.Add(new SqlParameter("@TenNguoiDung", nd.TenNguoiDung));
                cmd.Parameters.Add(new SqlParameter("@GioiTinh", nd.GioiTinh));
                cmd.Parameters.Add(new SqlParameter("@NgaySinh",nd.NgaySinh));
                cmd.Parameters.Add(new SqlParameter("@Email", nd.Email));
                cmd.Parameters.Add(new SqlParameter("@DiaChi", nd.DiaChi));
                cmd.Parameters.Add(new SqlParameter("@SDT", nd.SDT));
                cmd.Parameters.Add(new SqlParameter("@AnhDaiDien", nd.AnhDaiDien));
                //cmd.Parameters.Add(new SqlParameter("@UserName_Tao", nd.UserName_Tao));
                //cmd.Parameters.Add(new SqlParameter("@NgayTao", nd.NgayTao));
                cmd.Parameters.Add(new SqlParameter("@UserName_CapNhat", nd.UserName_CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayCapNhat", nd.NgayCapNhat));
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", nd.ID_NhomChucNang));
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
                cmd = new SqlCommand("deleteNguoiDung", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
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
        public HttpResponseMessage Get(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("detailNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        [Route("api/NguoiDung/Login/{username}/{password}")]
        [HttpGet]
        public HttpResponseMessage Get(string username, string password)
        {
            string id = loginIDNguoiDung(username, password);
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("detailNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
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
        [Route("api/NguoiDung/SaveFile")]
        public string SaveFile()
        {
            int index = countHinhAnh();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                var physicalPath = HttpContext.Current.Server.MapPath("~/Images/" + "avatar" + (index + 1) + ".png");
                string filename = "avatar" + (index + 1) + ".png";

                postedFile.SaveAs(physicalPath);
                return filename;
            }
            catch (Exception)
            {
                return "Không thành công";
            }
        }

        //get name bằng id nhóm chức năng
        [Route("api/NguoiDung/GetNameIDNhomChucNang/{id}")]
        [HttpGet]
        public string GetNameIDNhomChucNang(string id)
        {
            string idNCN = "";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getNameIDNhomChucNang", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                idNCN = cmd.ExecuteScalar().ToString();
            con.Close();
            return idNCN;
        }
        //get id bằng name nhóm chức năng
        [Route("api/NguoiDung/GetIDNameNhomChucNang/{name}")]
        [HttpGet]
        public string GetIDNameNhomChucNang(string name)
        {
            string nameNCN = "";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getIDNameNhomChucNang", con);
            cmd.Parameters.Add(new SqlParameter("@TenNhomChucNang", name));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                nameNCN = cmd.ExecuteScalar().ToString();
            con.Close();
            return nameNCN;
        }

        [Route("api/NguoiDung/GetAllNameNhomChucNang")]
        public HttpResponseMessage GetAllNameNhomChucNang()
        {
            string query = @"select TenNhomChucNang from dbo.NhomChucnang";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //Lấy id người dùng đăng nhập
        public static string loginIDNguoiDung(string username, string password)
        {
            string id = "error";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("LoginNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@UserName_ND", username));
            cmd.Parameters.Add(new SqlParameter("@Password_ND", password));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
                if(cmd.ExecuteScalar()!=null)
                    id = cmd.ExecuteScalar().ToString();
            con.Close();
            return id;
        }

        [Route("api/NguoiDung/checkUserName/{IDusername}")]
        [HttpGet]
        public string checkUserName(string IDusername)
        {
            string IDuser = "null";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("checkUserName", con);
            cmd.Parameters.Add(new SqlParameter("@UserName_ND", IDusername));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                IDuser = cmd.ExecuteScalar().ToString();
            con.Close();
            return IDuser;
        }
    }
}
