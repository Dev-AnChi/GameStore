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
    public class NhomChucNangController : ApiController
    {
        //get
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getNhomChucNang", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public static string createIDNhomChucNang()
        {
            Int32 count;
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("countNhomChucNang", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            count = (Int32)cmd.ExecuteScalar();
            con.Close();
            return "NCN" + (count+1).ToString();
        }
        //create
        public string Post(NhomChucNangModel ncn)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("createNhomChucNang", con);
                ncn.ID_NhomChucNang = createIDNhomChucNang();
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", ncn.ID_NhomChucNang));
                cmd.Parameters.Add(new SqlParameter("@TenNhomChucNang", ncn.TenNhomChucNang));
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
        public string Put(NhomChucNangModel ncn)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editNhomChucNang", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", ncn.ID_NhomChucNang));
                cmd.Parameters.Add(new SqlParameter("@TenNhomChucNang", ncn.TenNhomChucNang));
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
                cmd = new SqlCommand("deleteNhomChucNang", con);
                cmd.Parameters.Add(new SqlParameter("@ID_NhomChucNang", id));
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
