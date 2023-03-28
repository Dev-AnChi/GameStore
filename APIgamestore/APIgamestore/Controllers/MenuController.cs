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
    public class MenuController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MenuController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //get
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getMenu", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        //create
        [HttpPost]
        public JsonResult Post(MenuModel menu)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createMenu", con);
                cmd.Parameters.Add(new SqlParameter("@TenMenu", menu.TenMenu));
                cmd.Parameters.Add(new SqlParameter("@IconMenu", menu.IconMenu));
                cmd.Parameters.Add(new SqlParameter("@MoTa", menu.MoTa));
                cmd.Parameters.Add(new SqlParameter("@ID_MenuCha", menu.ID_MenuCha));

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
        public JsonResult Put(MenuModel menu)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editMenu", con);

                cmd.Parameters.Add(new SqlParameter("@ID_Menu", menu.ID_Menu));
                cmd.Parameters.Add(new SqlParameter("@TenMenu", menu.TenMenu));
                cmd.Parameters.Add(new SqlParameter("@IconMenu", menu.IconMenu));
                cmd.Parameters.Add(new SqlParameter("@MoTa", menu.MoTa));
                cmd.Parameters.Add(new SqlParameter("@ID_MenuCha", menu.ID_MenuCha));
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
                cmd = new SqlCommand("deleteMenu", con);
                cmd.Parameters.Add(new SqlParameter("@ID_Menu", id));
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
