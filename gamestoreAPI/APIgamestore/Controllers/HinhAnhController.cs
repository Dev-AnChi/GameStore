using APIgamestore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Net;
using System;

namespace APIgamestore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HinhAnhController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public HinhAnhController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        //get
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
            var cmd = new SqlCommand("getHinhAnh", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return new JsonResult(table);
        }

        //create
        [HttpPost]
        public JsonResult Post(HinhAnhModel anh)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("createHinhAnh", con);
                cmd.Parameters.Add(new SqlParameter("@AnhMH", anh.AnhMH));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", anh.ID_Game));

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
        public JsonResult Put(HinhAnhModel anh)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));
                cmd = new SqlCommand("editHinhAnh", con);
                cmd.Parameters.Add(new SqlParameter("@ID_AnhMH", anh.ID_AnhMH));
                cmd.Parameters.Add(new SqlParameter("@AnhMH", anh.AnhMH));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", anh.ID_Game));

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
                cmd = new SqlCommand("deleteHinhAnh", con);
                cmd.Parameters.Add(new SqlParameter("@ID_AnhMH", id));
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
            cmd = new SqlCommand("getIDHinhAnh", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);
            return new JsonResult(dt);
        }

        //chuyển ảnh vào thư mục Images (chọn file)
        [Route("/api/HinhAnh/SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            //int index = Directory.GetFiles(Path.Combine(_env.ContentRootPath, "Images")).Length;
            Random rand = new Random();
            int stringlen = 40;
            int randValue;
            string str = "";
            char letter;

            while(System.IO.File.Exists(Path.Combine(_env.ContentRootPath, "Images" + '\\'+str)) || str==""){
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
                string filename = "image_" + str + ".png";
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

        [Route("/api/HinhAnh/GetAllNameGame")]
        [HttpGet]
        public JsonResult GetAllNameGame()
        {
            string query = @"select Ten_Game from dbo.Game";

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
    }
}
