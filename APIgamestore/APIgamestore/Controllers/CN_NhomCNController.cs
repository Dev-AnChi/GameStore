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
    public class CN_NhomCNController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CN_NhomCNController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //get
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getCN_NhomCN", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        //create
        [HttpPost]
        public JsonResult Post(CN_NhomCNModel cn_ncn)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createCN_NhomCN", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", cn_ncn.ID_NhomChucNang));
                cmd.Parameters.Add(new SqlParameter("@ID_ChucNang", cn_ncn.ID_ChucNang));
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
        public JsonResult Put(CN_NhomCNModel cn_ncn)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editCN_NhomCN", con);
                cmd.Parameters.Add(new SqlParameter("@ID_CN_NhomCN", cn_ncn.ID_CN_NhomCN));
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", cn_ncn.ID_NhomChucNang));
                cmd.Parameters.Add(new SqlParameter("@ID_ChucNang", cn_ncn.ID_ChucNang));
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
                cmd = new SqlCommand("deleteCN_NhomCN", con);
                cmd.Parameters.Add(new SqlParameter("@ID_CN_NhomCN", id));
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
