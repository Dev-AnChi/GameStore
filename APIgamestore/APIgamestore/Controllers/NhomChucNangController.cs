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
    public class NhomChucNangController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public NhomChucNangController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //get
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getNhomChucNang", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        /*public static string createIDNhomChucNang()
        {
            Int32 count;
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("countNhomChucNang", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            count = (Int32)cmd.ExecuteScalar();
            con.Close();
            return "NCN" + (count + 1).ToString();
        }*/
        //create
        [HttpPost]
        public JsonResult Post(NhomChucNangModel ncn)
        {
            Int32 count;
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("countNhomChucNang", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            count = (Int32)cmd.ExecuteScalar();
            con.Close();
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createNhomChucNang", con);
                ncn.ID_NhomChucNang = "NCN" + (count + 1).ToString();
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", ncn.ID_NhomChucNang));
                cmd.Parameters.Add(new SqlParameter("@TenNhomChucNang", ncn.TenNhomChucNang));
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
        public JsonResult Put(NhomChucNangModel ncn)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editNhomChucNang", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", ncn.ID_NhomChucNang));
                cmd.Parameters.Add(new SqlParameter("@TenNhomChucNang", ncn.TenNhomChucNang));
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
        [HttpDelete]
        public JsonResult Delete(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("deleteNhomChucNang", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", id));
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
