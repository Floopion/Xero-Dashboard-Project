using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using IdentityModel.Client;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.IO;

namespace XeroApplication.Controllers
{
    [Route("/get-link")]
    [ApiController]
    public class OAuthController : Controller
    {
        private Items listofitems = new Items();
        static volatile public string holdAllData = "";

        static private string[] apiGetLinks = new string[] { "https://api.xero.com/api.xro/2.0/Invoices", "https://api.xero.com/api.xro/2.0/BankTransactions", "https://api.xero.com/api.xro/2.0/Payments", "https://api.xero.com/api.xro/2.0/TaxRates" };
        static private string[] holdAllDataArray = new string[apiGetLinks.Length];


        private MyXeroLogin _myXeroLogin;

        public OAuthController(MyXeroLogin myXeroLogin)
        {
            _myXeroLogin = myXeroLogin;     // get data from env variable

        }

        // GET api/values
        [HttpGet]
        public JsonResult Get()
        //ContentResult
        {
            var xeroAuthorizeUri = new RequestUrl("https://login.xero.com/identity/connect/authorize");
            var url = xeroAuthorizeUri.CreateAuthorizeUrl(
             clientId: _myXeroLogin.ClientID,
             responseType: "code", //hardcoded authorisation code for now.
             //redirectUri: "https://localhost:5001/oauth",
             redirectUri: "https://localhost:5001/getData",
             scope: "openid profile email files accounting.transactions accounting.transactions.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read offline_access"
         );

        var AuthLink = new { Status = 200, Link = url};
        return Json(AuthLink);
        }

        [HttpGet("/getData")]
        public async Task<ActionResult> GetData(string code, string state)
        {
            var result = new ContentResult();
            var tenantList = new List<Tenant>();
            using (var client = new HttpClient())
            {
                var response = await client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
                {
                    Address = "https://identity.xero.com/connect/token",
                    GrantType = "code",
                    Code = code,
                    ClientId = _myXeroLogin.ClientID,
                    ClientSecret = _myXeroLogin.ClientSecret,
                    RedirectUri = "https://localhost:5001/getData",
                    Parameters =
                    {
                        { "scope", "openid profile email files accounting.transactions accounting.transactions.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read offline_access"}
                    }
                });

                if (response.IsError) { throw new Exception(response.Error); }
                var accessToken = response.AccessToken;
                var refreshToken = response.RefreshToken;
                var identityToken = response.IdentityToken;
                string tenant;
                string invoices;

                listofitems.Status = 200;
                listofitems.Token = accessToken;
                listofitems.Refresh = refreshToken;
                listofitems.Idenitiy = identityToken;

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                using (var requestMessage = new HttpRequestMessage(System.Net.Http.HttpMethod.Get, "https://api.xero.com/connections"))
                {
                    HttpResponseMessage httpResult = client.SendAsync(requestMessage).Result;
                    System.Console.WriteLine(httpResult.RequestMessage);
                    tenant = httpResult.Content.ReadAsStringAsync().Result;
                    tenantList = JsonConvert.DeserializeObject<List<Tenant>>(tenant);
                }
                for (int i = 0; i < apiGetLinks.Length; i++)
                {
                    string data = "";
                    foreach (Tenant t in tenantList)
                    {
                        using (var requestMessage = new HttpRequestMessage(System.Net.Http.HttpMethod.Get, apiGetLinks[i]))
                        {
                            requestMessage.Headers.Add("xero-tenant-id", t.TenantId.ToString());
                            HttpResponseMessage httpResult = client.SendAsync(requestMessage).Result;
                            System.Console.WriteLine(httpResult.RequestMessage);
                            invoices = httpResult.Content.ReadAsStringAsync().Result;
                            data = data + invoices;
                        }
                        
                        listofitems.Tenant = JsonConvert.SerializeObject(tenantList);
                        listofitems.Invoices = "Data is already formatted to json on request from xero. View '/showData' for more information.";          
                        
                        holdAllDataArray[i] = data;      

                    }
                }
            }

            string jsonthis = JsonConvert.SerializeObject(listofitems);
            holdAllData = jsonthis;     // global variable, this is bad. Will change it later

            System.Console.WriteLine("REDIRECTION");
            return Redirect("https://localhost:5001/fetch-data");
            // return Content(jsonthis, "application/json");
        
        }

        
        [HttpGet("/getInvoices")]
        public ActionResult DisplayInvoice()
        {
            Items isNull = new Items();
            if(holdAllDataArray[0] == null)
            {
                isNull.Status = 404;
                string isNullData = JsonConvert.SerializeObject(isNull);
                return Content(isNullData, "application/json");
            }
            else {
                return Content(holdAllDataArray[0], "application/json");
            }
        }

        [HttpGet("/getBankTransactions")]
        public ActionResult DisplayBankTransactions()
        {
            Items isNull = new Items();
            if(holdAllDataArray[1] == null)
            {
                isNull.Status = 404;
                string isNullData = JsonConvert.SerializeObject(isNull);
                return Content(isNullData, "application/json");
            }
            else {
                return Content(holdAllDataArray[1], "application/json");
            }
        }

        [HttpGet("/getPayments")]
        public ActionResult DisplayPayments()
        {
            Items isNull = new Items();
            if(holdAllDataArray[2] == null)
            {
                isNull.Status = 404;
                string isNullData = JsonConvert.SerializeObject(isNull);
                return Content(isNullData, "application/json");
            }
            else {
                return Content(holdAllDataArray[2], "application/json");
            }
        }

        
        [HttpGet("/getTaxRates")]
        public ActionResult DisplayTaxRates()
        {
            Items isNull = new Items();
            if(holdAllDataArray[3] == null)
            {
                isNull.Status = 404;
                string isNullData = JsonConvert.SerializeObject(isNull);
                return Content(isNullData, "application/json");
            }
            else {
                return Content(holdAllDataArray[3], "application/json");
            }
        }


        [HttpGet("/showToken")]
        public ActionResult DisplayToken()
        {
            //string jsonthis = JsonConvert.SerializeObject(listofitems);
            Items isNull = new Items();
            if(holdAllData == "")
            {
                isNull.Status = 404;
                string isNullData = JsonConvert.SerializeObject(isNull);
                return Content(isNullData, "application/json");
            }
            else {
                return Content(holdAllData, "application/json");
            }
        }
    }
}
