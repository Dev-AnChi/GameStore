using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace APIgamestore.Models
{
    public class GoogleDriveService
    {
        // Thông tin xác thực
        private static readonly string[] Scopes = { DriveService.Scope.DriveReadonly };
        private static readonly string ApplicationName = "api-google-drive-apk";
        private static readonly string ClientSecretFileName = "client_secret_143076549869-lbuqgj1g53rrhptikv52ga1eaoerg7kk.apps.googleusercontent.com.json"; // Tên file chứa client secret của bạn

        public async Task<byte[]> DownloadFile(string fileId)
        {
            // Xác thực và tạo service object
            UserCredential credential;
            using (var stream = new FileStream(ClientSecretFileName, FileMode.Open, FileAccess.Read))
            {
                string credPath = "token.json";
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true));
                    /*new GoogleWebAuthorizationBroker.AuthorizeAsyncArgs
                    {
                        RedirectUri = "http://localhost:5162/authorize"
                    });*/
            }
            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            // Tải file
            var fileContent = await service.Files.Get(fileId).ExecuteAsync();
            var downloadUrl = fileContent.WebContentLink;
            var streamResponse = await service.HttpClient.GetStreamAsync(downloadUrl);
            using (var memoryStream = new MemoryStream())
            {
                await streamResponse.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
