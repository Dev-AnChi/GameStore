using APIgamestore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Net;
//md5
using System.Security.Cryptography;
using System.Text;



namespace APIgamestore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguoiDungController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        private string EncryptPassword(string password)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.ASCII.GetBytes(password);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    builder.Append(hashBytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public NguoiDungController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getNguoiDung", con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }


        //create
        [HttpPost]
        public JsonResult Post(NguoiDungModel nd)
        {
            //md5
            nd.Password_ND = EncryptPassword(nd.Password_ND);


            Int32 count;
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("countNguoiDung", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            count = (Int32)cmd.ExecuteScalar();
            con.Close();

            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            try
            {
                DateTime dateTime = DateTime.Now;
                nd.NgayTao = dateTime.ToString("yyyy/MM/dd HH:mm:ss");
                nd.NgayCapNhat = dateTime.ToString("yyyy/MM/dd HH:mm:ss");
                nd.ID_NguoiDung = "ND" + (count + 1).ToString();

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
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

                return new JsonResult("Thành công !!");
            }
            catch (Exception)
            {
                return new JsonResult("Không thành công !!");
            }
        }

        //edit
        [HttpPut]
        public JsonResult Put(NguoiDungModel nd)
        {
            nd.Password_ND = EncryptPassword(nd.Password_ND);
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                nd.NgayCapNhat = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editNguoiDung", con);
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
                //cmd.Parameters.Add(new SqlParameter("@UserName_Tao", nd.UserName_Tao));
                //cmd.Parameters.Add(new SqlParameter("@NgayTao", nd.NgayTao));
                cmd.Parameters.Add(new SqlParameter("@UserName_CapNhat", nd.UserName_CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayCapNhat", nd.NgayCapNhat));
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", nd.ID_NhomChucNang));
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

        //delete
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
                cmd = new SqlCommand("deleteNguoiDung", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
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
        public JsonResult Get(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("detailNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

        [Route("/api/NguoiDung/Login/{username}/{password}")]
        [HttpGet]
        public JsonResult Get(string username, string password)
        {
            string hashedPassword = EncryptPassword(password);

            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("LoginNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@UserName_ND", username));
            cmd.Parameters.Add(new SqlParameter("@Password_ND", hashedPassword));
            cmd.CommandType = CommandType.StoredProcedure;
            
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

        //chuyển ảnh vào thư mục Images (chọn file)
        [Route("/api/NguoiDung/SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            //int index = Directory.GetFiles(Path.Combine(_env.ContentRootPath, "Images")).Length;
            Random rand = new Random();
            int stringlen = 40;
            int randValue;
            string str = "";
            char letter;

            while (System.IO.File.Exists(Path.Combine(_env.ContentRootPath, "Images" + '\\' + str)) || str == "")
            {
                for (int i = 0; i < stringlen; i++)
                {
                    randValue = rand.Next(0, 26);
                    letter = Convert.ToChar(randValue + 65);
                    str = str + letter;
                }
            }

            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = "avatar" + str + ".png";
                var physicalPath = _env.ContentRootPath + "/Images/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
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

        //get name bằng id nhóm chức năng
        [Route("/api/NguoiDung/GetNameIDNhomChucNang/{id}")]
        [HttpGet]
        public JsonResult GetNameIDNhomChucNang(string id)
        {
            string idNCN = "";
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getNameIDNhomChucNang", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                idNCN = cmd.ExecuteScalar().ToString();
            con.Close();
            return new JsonResult(idNCN);
        }
        //get id bằng name nhóm chức năng
        [Route("/api/NguoiDung/GetIDNameNhomChucNang/{name}")]
        [HttpGet]
        public JsonResult GetIDNameNhomChucNang(string name)
        {
            string nameNCN = "";
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getIDNameNhomChucNang", con);
            cmd.Parameters.Add(new SqlParameter("@TenNhomChucNang", name));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                nameNCN = cmd.ExecuteScalar().ToString();
            con.Close();
            return new JsonResult(nameNCN);
        }

        [Route("/api/NguoiDung/GetAllNameNhomChucNang")]
        [HttpGet]
        public JsonResult GetAllNameNhomChucNang()
        {
            string query = @"select TenNhomChucNang from dbo.NhomChucnang";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore")))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return new JsonResult(table);
        }

        //Lấy id người dùng đăng nhập
        /*public static string loginIDNguoiDung(string username, string password)
        {
            string id = "error";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("LoginNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@UserName_ND", username));
            cmd.Parameters.Add(new SqlParameter("@Password_ND", password));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                id = cmd.ExecuteScalar().ToString();
            con.Close();
            return id;
        }*/

        [Route("/api/NguoiDung/checkUserName/{IDusername}")]
        [HttpGet]
        public JsonResult checkUserName(string IDusername)
        {
            string IDuser = "null";
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("checkUserName", con);
            cmd.Parameters.Add(new SqlParameter("@UserName_ND", IDusername));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                IDuser = cmd.ExecuteScalar().ToString();
            con.Close();
            return new JsonResult(IDuser);
        }

        [Route("/api/NguoiDung/capquyenAdmin/{id}")]
        [HttpGet]
        public JsonResult capquyenAdmin(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("CapQuyenAdmin", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
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

        [Route("/api/NguoiDung/huyquyenAdmin/{id}")]
        [HttpGet]
        public JsonResult huyquyenAdmin(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("HuyQuyenAdmin", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
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
    }
}
