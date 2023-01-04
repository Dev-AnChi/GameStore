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
    public class GameDaTaiController : ApiController
    {
        //get
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getGameDaTai", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //create
        public string Post(GameDaTaiModel gdt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                gdt.NgayTai = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("createGameDaTai", con);
                cmd.Parameters.Add(new SqlParameter("@CapNhat", gdt.CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayTai", gdt.NgayTai));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", gdt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", gdt.ID_Game));
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
        public string Put(GameDaTaiModel gdt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                gdt.NgayTai = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editGameDaTai", con);

                cmd.Parameters.Add(new SqlParameter("@ID_GameDaTai", gdt.ID_GameDaTai));
                cmd.Parameters.Add(new SqlParameter("@CapNhat", gdt.CapNhat));
                cmd.Parameters.Add(new SqlParameter("@NgayTai", gdt.NgayTai));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", gdt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", gdt.ID_Game));
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
                cmd = new SqlCommand("deleteGameDaTai", con);
                cmd.Parameters.Add(new SqlParameter("@ID_GameDaTai", id));
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

        //get YeuThich theo ID_NguoiDung
        [Route("api/GameDaTai/getGameDaTaiIDNguoiDung/{id}")]
        [HttpGet]
        public HttpResponseMessage Get(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("getGameDaTaiIDNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        [Route("api/GameDaTai/checkGameDaTai/{user}/{id}")]
        [HttpGet]
        public string GetIDNameTheLoai(string user, int id)
        {
            string ID_GameDaTai = "error";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("checkGameDaTai", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", user));
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                ID_GameDaTai = cmd.ExecuteScalar().ToString();
            con.Close();
            return ID_GameDaTai;
        }
    }
}
