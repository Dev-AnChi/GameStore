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
    public class BinhLuanController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BinhLuanController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]        
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getBinhLuan", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        //create
        [HttpPost]
        public JsonResult Post(BinhLuanModel bl)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                bl.NgayBinhLuan = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createBinhLuan", con);
                cmd.Parameters.Add(new SqlParameter("@DanhGia", bl.DanhGia));
                cmd.Parameters.Add(new SqlParameter("@NoiDungBL", bl.NoiDungBL));
                cmd.Parameters.Add(new SqlParameter("@NgayBinhLuan", bl.NgayBinhLuan));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiBinhLuan", bl.ID_NguoiBinhLuan));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", bl.ID_Game));

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
        public JsonResult Put(BinhLuanModel bl)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                bl.NgayBinhLuan = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editBinhLuan", con);
                cmd.Parameters.Add(new SqlParameter("@ID_BinhLuan", bl.ID_BinhLuan));
                cmd.Parameters.Add(new SqlParameter("@DanhGia", bl.DanhGia));
                cmd.Parameters.Add(new SqlParameter("@NoiDungBL", bl.NoiDungBL));
                cmd.Parameters.Add(new SqlParameter("@NgayBinhLuan", bl.NgayBinhLuan));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiBinhLuan", bl.ID_NguoiBinhLuan));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", bl.ID_Game));
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
                cmd = new SqlCommand("deleteBinhLuan", con);
                cmd.Parameters.Add(new SqlParameter("@ID_BinhLuan", id));
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


        [Route("/api/BinhLuan/getBinhLuanIDGame/{idgame}")]
        [HttpGet]
        public JsonResult Get(int idgame)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("getBinhLuanIDGame", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", idgame));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

        /*
        [Route("/api/BinhLuan/checkBinhLuan/{idgame}/{iduser}")]
        [HttpGet]
        public JsonResult Get(int idgame, string iduser)
        {
            int check = 0;
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("checkBinhluan", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", idgame));
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", iduser));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                check = int.Parse(cmd.ExecuteScalar().ToString());
            con.Close();
            return new JsonResult(check);
        }*/

        [Route("/api/BinhLuan/findBinhLuan/{idgame}/{iduser}")]
        [HttpGet]
        public JsonResult Get(int idgame, string iduser)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("findBinhLuan", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", idgame));
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", iduser));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

    }
}
