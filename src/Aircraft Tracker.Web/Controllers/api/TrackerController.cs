using Aircraft_Tracker.Core.Api.OpenSky;
using Microsoft.AspNetCore.Mvc;

namespace Aircraft_Tracker.Web.Controllers.api
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrackerController : Controller
    {
        [HttpGet]
        [Route("get")]
        // .../api/tracker/get
        public async Task<IActionResult> GetAsync()
        {
        //    var openSky = new OpenSky();
        //    List<KeyValuePair<string, string>> test = new List<KeyValuePair<string, string>>();
        //    test.Add(new KeyValuePair<string, string>("test", "value"));
        //    _ = await openSky.GetRequestAsync("test", test);

            return Ok();
        }
    }
}
