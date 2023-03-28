using APIgamestore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Net;

namespace APIgamestore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YeuThichController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public YeuThichController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //get
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getYeuThich", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        //create
        [HttpPost]
        public JsonResult Post(YeuThichModel yt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                yt.NgayThich = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createYeuThich", con);
                cmd.Parameters.Add(new SqlParameter("@NgayThich", yt.NgayThich));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", yt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", yt.ID_Game));
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
        public JsonResult Put(YeuThichModel yt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                yt.NgayThich = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editYeuThich", con);
                cmd.Parameters.Add(new SqlParameter("@ID_YeuThich", yt.ID_YeuThich));
                cmd.Parameters.Add(new SqlParameter("@NgayThich", yt.NgayThich));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", yt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", yt.ID_Game));
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
                cmd = new SqlCommand("deleteYeuThich", con);
                cmd.Parameters.Add(new SqlParameter("@ID_YeuThich", id));
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

        //get YeuThich theo ID_NguoiDung
        [Route("/api/YeuThich/getYeuThichIDNguoiDung/{id}")]
        [HttpGet]
        public JsonResult Get(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("getYeuThichIDNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

        [Route("/api/YeuThich/checkYeuThich/{user}/{id}")]
        [HttpGet]
        public JsonResult GetIDNameTheLoai(string user, int id)
        {
            string ID_YeuThich = "error";
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("checkYeuThich", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", user));
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                ID_YeuThich = cmd.ExecuteScalar().ToString();
            con.Close();
            return new JsonResult(ID_YeuThich);
        }
    }
}
