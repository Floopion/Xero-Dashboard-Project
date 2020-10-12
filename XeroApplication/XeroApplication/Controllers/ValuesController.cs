using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace XeroApplication.Controllers
{
    [Route("/api/values")]
    [ApiController]
    [Produces("application/json")]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public String get(){
           return { "name":"John", "age":30, "car":null }
        }
}
