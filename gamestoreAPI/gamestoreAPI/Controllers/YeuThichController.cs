﻿using gamestoreAPI.Models;
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
    public class YeuThichController : ApiController
    {
        //get
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("getYeuThich", con);

            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //create
        public string Post(YeuThichModel yt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                yt.NgayThich = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("createYeuThich", con);
                cmd.Parameters.Add(new SqlParameter("@NgayThich", yt.NgayThich));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", yt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", yt.ID_Game));
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
        public string Put(YeuThichModel yt)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;
            try
            {
                DateTime dateTime = DateTime.Now;
                yt.NgayThich = dateTime.ToString("yyyy/MM/dd HH:mm:ss");

                con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
                cmd = new SqlCommand("editYeuThich", con);
                cmd.Parameters.Add(new SqlParameter("@ID_YeuThich", yt.ID_YeuThich));
                cmd.Parameters.Add(new SqlParameter("@NgayThich", yt.NgayThich));
                cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", yt.ID_NguoiDung));
                cmd.Parameters.Add(new SqlParameter("@ID_Game", yt.ID_Game));
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
                cmd = new SqlCommand("deleteYeuThich", con);
                cmd.Parameters.Add(new SqlParameter("@ID_YeuThich", id));
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
        [Route("api/YeuThich/getYeuThichIDNguoiDung/{id}")]
        [HttpGet]
        public HttpResponseMessage Get(string id)
        {
            SqlCommand cmd;
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            SqlConnection con;

            con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            cmd = new SqlCommand("getYeuThichIDNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", id));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(dt);

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        [Route("api/YeuThich/checkYeuThich/{user}/{id}")]
        [HttpGet]
        public string GetIDNameTheLoai(string user, int id)
        {
            string ID_YeuThich = "error";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["dataGameStore"].ConnectionString);
            var cmd = new SqlCommand("checkYeuThich", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", user));
            cmd.Parameters.Add(new SqlParameter("@ID_Game", id));
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            if (cmd.ExecuteScalar() != null)
                ID_YeuThich = cmd.ExecuteScalar().ToString();
            con.Close();
            return ID_YeuThich;
        }
    }
}
