using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using unumAssignment.Model;

namespace unumAssignment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UnumController : ControllerBase
    {
        [HttpPost]
        [Route("calculate")]
        public UnumResponse CalculateValues([FromBody] IEnumerable<int> unumRequest)
        {
            return new UnumResponse
            {
                Numbers = string.Join(", ", unumRequest),
                Max = Enumerable.Max(unumRequest),
                Min = Enumerable.Min(unumRequest),
                Avg = Math.Round(Enumerable.Average(unumRequest), 2)
            };
        }
    }
}
