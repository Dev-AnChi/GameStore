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
    public class ChucNangController : ApiController
    {
        //get
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getChucNang", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public static string createIDChucNang()
        {
            Int32 count;
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("countChucNang", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            count = (Int32)cmd.ExecuteScalar();
            con.Close();
            return "CN" + (count + 1).ToString();
        }
        //create
        public string Post(ChucNangModel cn)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("createChucNang", con);
                cn.ID_ChucNang = createIDChucNang();
                cmd.Parameters.Add(new SqlParameter("@ID_ChucNang", cn.ID_ChucNang));
                cmd.Parameters.Add(new SqlParameter("@TenChucNang", cn.TenChucNang));
                cmd.Parameters.Add(new SqlParameter("@Quyen", cn.Quyen));
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
        public string Put(ChucNangModel cn)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editChucNang", con);
                cmd.Parameters.Add(new SqlParameter("@ID_ChucNang", cn.ID_ChucNang));
                cmd.Parameters.Add(new SqlParameter("@TenChucNang", cn.TenChucNang));
                cmd.Parameters.Add(new SqlParameter("@Quyen", cn.Quyen));
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
                cmd = new SqlCommand("deleteChucNang", con);
                cmd.Parameters.Add(new SqlParameter("@ID_ChucNang", id));
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
    }
}
