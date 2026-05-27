using Microsoft.AspNetCore.Mvc;

namespace VRL.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("VRL API is running");
        }
    }
}