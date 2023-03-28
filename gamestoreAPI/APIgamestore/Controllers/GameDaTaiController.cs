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
    public class GameDaTaiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public GameDaTaiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        //get
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getGameDaTai", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        //create
        [HttpPost]
        public JsonResult Post(GameDaTaiModel gdt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                gdt.NgayTai = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createGameDaTai", con);
                cmd.Parameters.Add(new SqlParameter("@CapNhat", gdt.CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayTai", gdt.NgayTai));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", gdt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", gdt.ID_Game));
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
        public JsonResult Put(GameDaTaiModel gdt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                gdt.NgayTai = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editGameDaTai", con);

                cmd.Parameters.Add(new SqlParameter("@ID_GameDaTai", gdt.ID_GameDaTai));
                cmd.Parameters.Add(new SqlParameter("@CapNhat", gdt.CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayTai", gdt.NgayTai));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", gdt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", gdt.ID_Game));
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
                cmd = new SqlCommand("deleteGameDaTai", con);
                cmd.Parameters.Add(new SqlParameter("@ID_GameDaTai", id));
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
        [Route("/api/GameDaTai/getGameDaTaiIDNguoiDung/{id}")]
        [HttpGet]
        public JsonResult Get(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("getGameDaTaiIDNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

        [Route("/api/GameDaTai/checkGameDaTai/{user}/{id}")]
        [HttpGet]
        public JsonResult GetIDNameTheLoai(string user, int id)
        {
            string ID_GameDaTai = "error";
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("checkGameDaTai", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", user));
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                ID_GameDaTai = cmd.ExecuteScalar().ToString();
            con.Close();
            return new JsonResult(ID_GameDaTai);
        }
    }
}
