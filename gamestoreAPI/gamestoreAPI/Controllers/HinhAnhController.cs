using gamestoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace gamestoreAPI.Controllers
{
    public class HinhAnhController : ApiController
    {
        //get
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getHinhAnh", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //create
        public string Post(HinhAnhModel anh)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("createHinhAnh", con);
                cmd.Parameters.Add(new SqlParameter("@AnhMH", anh.AnhMH));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", anh.ID_Game));

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
        public string Put(HinhAnhModel anh)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editHinhAnh", con);
                cmd.Parameters.Add(new SqlParameter("@ID_AnhMH", anh.ID_AnhMH));
                cmd.Parameters.Add(new SqlParameter("@AnhMH", anh.AnhMH));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", anh.ID_Game));

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
                cmd = new SqlCommand("deleteHinhAnh", con);
                cmd.Parameters.Add(new SqlParameter("@ID_AnhMH", id));
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

        public HttpResponseMessage Get(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("getIDHinhAnh", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
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
        [Route("api/HinhAnh/SaveFile")]
        public string SaveFile()
        {
            int index = countHinhAnh();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                var physicalPath = HttpContext.Current.Server.MapPath("~/Images/" + "image" + (index+1) + ".png");
                string filename = "image"+(index+1)+".png";

                postedFile.SaveAs(physicalPath);
                return filename;
            }
            catch (Exception)
            {
                return "Không thành công";
            }
        }

        [Route("api/HinhAnh/GetAllNameGame")]
        [HttpGet]
        public HttpResponseMessage GetAllNameGame()
        {
            string query = @"select Ten_Game from dbo.Game";

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
    }
}
