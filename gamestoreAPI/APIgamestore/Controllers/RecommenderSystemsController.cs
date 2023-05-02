using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace APIgamestore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommenderSystemsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RecommenderSystemsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        public static double[][] ConvertDataTableToMatrix(DataTable dt)
        {
            double[][] matrix = new double[dt.Rows.Count][];
            Converter<object, double> converter = Convert.ToDouble;

            for (int row = 0; row < dt.Rows.Count; row++)
            {
                matrix[row] = Array.ConvertAll(dt.Rows[row].ItemArray, converter);
            }

            return matrix;
        }

        [HttpGet("{idUser}")]
        public JsonResult Get(string idUser)
        {
            DataTable table = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter();
            var con = new SqlConnection(_configuration.GetConnectionString("dataGameStore"));

            var cmd = new SqlCommand("getIDLoai", con);
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(table);
            double[][] idloai = ConvertDataTableToMatrix(table);

            table = new DataTable();
            cmd = new SqlCommand("getRateIDNguoiDung", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiBinhLuan", idUser));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(table);
            double[][] ratenguoidung = ConvertDataTableToMatrix(table);

            double[][] matrix = new double[ratenguoidung.Length][];
            for(int i=0; i < ratenguoidung.Length; i++)
            {
                double[] array = new double[idloai.Length];
                for(int j=0; j<idloai.Length; j++)
                {
                    int temp = 0;
                    cmd = new SqlCommand("checkTheLoaiGame", con);
                    cmd.Parameters.Add(new SqlParameter("@id_game", ratenguoidung[i][0]));
                    cmd.Parameters.Add(new SqlParameter("@id_loai", idloai[j][0]));
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    if (cmd.ExecuteScalar() != null)
                        temp = int.Parse(cmd.ExecuteScalar().ToString());
                    array[j] = temp;
                    con.Close();                    
                }
                matrix[i] = array;
            }

            for(int i=0; i<ratenguoidung.Length; i++)
            {
                for(int j=0; j<idloai.Length; j++)
                {
                    matrix[i][j] *= ratenguoidung[i][1];
                }
            }

            double[] rateAVG = new double[idloai.Length];
            for(int i=0; i < matrix[0].Length; i++)
            {
                rateAVG[i] = 0;
                for(int j=0; j < matrix.Length; j++)
                {
                    rateAVG[i] += matrix[j][i];
                }
            }

            double sum_rate = 0;
            for(int i = 0; i<rateAVG.Length; i++)
            {
                sum_rate += rateAVG[i];
            }
            for(int i=0; i<rateAVG.Length; i++)
            {
                rateAVG[i] /= sum_rate;
                rateAVG[i] = Math.Round(rateAVG[i], 2);
            }

            table = new DataTable();
            cmd = new SqlCommand("getFullIDGame", con);
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(table);
            double[][] idgame = ConvertDataTableToMatrix(table);

            double[][] matrix1 = new double[idgame.Length][];
            for (int i = 0; i < idgame.Length; i++)
            {
                double[] array = new double[idloai.Length];
                for (int j = 0; j < idloai.Length; j++)
                {
                    int temp = 0;
                    cmd = new SqlCommand("checkTheLoaiGame", con);
                    cmd.Parameters.Add(new SqlParameter("@id_game", idgame[i][0]));
                    cmd.Parameters.Add(new SqlParameter("@id_loai", idloai[j][0]));
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    if (cmd.ExecuteScalar() != null)
                        temp = int.Parse(cmd.ExecuteScalar().ToString());
                    array[j] = temp;
                    con.Close();
                }
                matrix1[i] = array;
            }

            double[] rateRecommender = new double[idgame.Length];
            for(int i=0; i<idgame.Length; i++)
            {
                rateRecommender[i] = 0;
                for(int j=0; j<idloai.Length; j++)
                {
                    rateRecommender[i] += (matrix1[i][j] * rateAVG[j]);
                }
            }
            
            double tam = 0;
            double vt = 0;
            for(int i=0; i<rateRecommender.Length-1; i++)
            {
                for(int j=i+1; j<rateRecommender.Length; j++)
                {
                    if (rateRecommender[i] < rateRecommender[j])
                    {
                        tam = rateRecommender[i];
                        rateRecommender[i] = rateRecommender[j];
                        rateRecommender[j] = tam;

                        vt = idgame[i][0];
                        idgame[i][0] = idgame[j][0];
                        idgame[j][0] = vt;
                    }
                }
            }

            table = new DataTable();
            cmd = new SqlCommand("getFullIDGameDaTai", con);
            cmd.Parameters.Add(new SqlParameter("@ID_NguoiDung", idUser));
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(table);
            double[][] idgamedatai = ConvertDataTableToMatrix(table);

            double[] result = new double[3];
            int index = 0;
            for (int i=0; i<idgame.Length; i++)
            {
                for(int j=0; j<idgamedatai.Length; j++)
                {
                    if (idgame[i][0] == idgamedatai[j][0])
                    {
                        idgame[i][0] = 0;
                    }
                }
            }
            for(int i=0; i<idgame.Length; i++)
            {
                if (index == 3)
                    break;
                if (idgame[i][0] != 0)
                {
                    result[index] = idgame[i][0];
                    index++;
                }
            }

            return new JsonResult(result);
        }

    }
}
