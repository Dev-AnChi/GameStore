using gamestoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace gamestoreAPI.Controllers
{
    public class BinhLuanController : ApiController
    {
        //get
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getBinhLuan", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //create
        public string Post(BinhLuanModel bl)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                bl.NgayBinhLuan = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("createBinhLuan", con);
                cmd.Parameters.Add(new SqlParameter("@DanhGia", bl.DanhGia));
                cmd.Parameters.Add(new SqlParameter("@NoiDungBL", bl.NoiDungBL));
                cmd.Parameters.Add(new SqlParameter("@NgayBinhLuan", bl.NgayBinhLuan));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiBinhLuan", bl.ID_NguoiBinhLuan));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", bl.ID_Game));

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
        public string Put(BinhLuanModel bl)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                bl.NgayBinhLuan = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
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
                cmd = new SqlCommand("deleteBinhLuan", con);
                cmd.Parameters.Add(new SqlParameter("@ID_BinhLuan", id));
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

        
        [Route("api/BinhLuan/getBinhLuanIDGame/{idgame}")]
        [HttpGet]
        public HttpResponseMessage Get(int idgame)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("getBinhLuanIDGame", con);
            cmd.Parameters.Add(new SqlParameter("@ID_Game", idgame));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
    }
}
