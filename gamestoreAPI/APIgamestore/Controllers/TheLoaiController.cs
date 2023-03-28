using APIgamestore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace APIgamestore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheLoaiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TheLoaiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //get
        //[Authorize]
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getTheLoai", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        //create
        [HttpPost]
        public JsonResult Post(TheLoaiModel tl)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createTheLoai", con);
                //cmd.Parameters.Add(new SqlParameter("@TenTheLoai", tl.TenTheLoai));
                cmd.Parameters.AddWithValue("@TenTheLoai", tl.TenTheLoai);
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
        public JsonResult Put(TheLoaiModel tl)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editTheLoai", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Loai", tl.ID_Loai));
                cmd.Parameters.Add(new SqlParameter("@TenTheLoai", tl.TenTheLoai));
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
                cmd = new SqlCommand("deleteTheLoai", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Loai", id));
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


        //details
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            cmd = new SqlCommand("detailTheLoai", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Loai", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return new JsonResult(dt);
        }

        [Route("/api/TheLoai/GetIDNameTheLoai/{name}")]
        [HttpGet]
        public JsonResult GetIDNameTheLoai(string name)
        {
            string ID_Loai = "";
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getIDNameTheLoai", con);
            cmd.Parameters.Add(new SqlParameter("@TenTheLoai", name));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                ID_Loai = cmd.ExecuteScalar().ToString();
            con.Close();
            return new JsonResult(ID_Loai);
        }
    }
}
