using APIgamestore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace gamestoreAPI.Controllers
{
    public class DownloadController
    {
        private readonly GoogleDriveService googleDriveService;

        public DownloadController(GoogleDriveService googleDriveService)
        {
            this.googleDriveService = googleDriveService;
        }

        [HttpGet("/api/drive/download/{fileId}")]
        public async Task<IActionResult> Download(string fileId)
        {
            var fileContent = await googleDriveService.DownloadFile(fileId);
            return new FileContentResult(fileContent, "image/png")
            {
                FileDownloadName = "hinh.png"
            };
        }
    }
}
