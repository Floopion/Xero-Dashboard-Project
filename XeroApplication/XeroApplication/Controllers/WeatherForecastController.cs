using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;


namespace XeroApplication.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        // private IConfiguration _configuration;

        // public WeatherForecastController(IConfiguration Configuration) {
        //      _configuration = Configuration;
        //  }

        private IDesignTimeMvcBuilderConfiguration _confiuration;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public WeatherForecast Get()
        {
            WeatherForecast weather = new WeatherForecast();
            weather.Date = DateTime.Now.AddDays(1);
            weather.Name = "Testing api call";
            weather.Link = "https://login.xero.com/identity/connect/authorize?response_type=code&client_id=9D49BD8A6A61429E98270B90FD3A5FFE&redirect_uri=https://localhost:5001/fetch-data&scope=openid profile email accounting.transactions";
            return weather;            

            // var rng = new Random();
            // return Enumerable.Range(0, 1).Select(index => new WeatherForecast
            // {
            //     Date = DateTime.Now.AddDays(index),
            //     Summary = Summaries[1]
            // })
            // .ToArray();
        }








        //  [HttpGet]
        // public IEnumerable<WeatherForecast> Get()
        // {
        //     var rng = new Random();
        //     return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //     {
        //         Date = DateTime.Now.AddDays(index),
        //         TemperatureC = rng.Next(-20, 55),
        //         Summary = Summaries[rng.Next(Summaries.Length)]
        //     })
        //     .ToArray();
        // }
    }
}
