using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FullStackDemo.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FullStackDemo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(template: "{date:datetime}")]
        public IEnumerable<WeatherForecast> Get(DateTime date)
        {
            var rng = new Random();
            return Enumerable.Range(0, 4).Select(index => new WeatherForecast
            {
                Date = date.Date.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet()]
        public async Task<CollectionResponse<WeatherForecast>> Get(int page = 1, int pageSize = 5)
        {
            await Task.Delay(TimeSpan.FromSeconds(1));
            var rng = new Random();
            var chunk = Enumerable.Range(1, pageSize).Select(index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                })
                .ToArray();

            return new CollectionResponse<WeatherForecast>(chunk, 100);
        }
    }
}
