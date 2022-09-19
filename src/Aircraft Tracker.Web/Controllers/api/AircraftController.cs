using Aircraft_Tracker.Core.Api.OpenSky;
using Microsoft.AspNetCore.Mvc;

namespace Aircraft_Tracker.Web.Controllers.api
{
    [ApiController]
    [Route("api/[controller]")]
    public class AircraftController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AirccraftManager _aircraftManager = new();

        public AircraftController(UserManager<ApplicationUser> userManager)
        {
            this._userManager = userManager;
        }

        [HttpPost]
        [Route("mark")]
        // .../api/aircraft/mark
        public async Task<IActionResult> MarkAircraft([FromBody]MarkAircraftInput input)
        {
            var userEmail = User.Identity.Name;

            var result = _aircraftManager.AddNewMark(userMail, input.flightNr);

            if (result.Item1)
            {
                return Ok(new {
                    Success = true;
                    Result = "You have successfully marked a flight";
                });
            }
            
            return BadRequest(new {
                Success = false;
                ErrorCode = "";
                ErrorMessage = result.Item2;
            });
        }

        [HttpDelete]
        [Route("mark")]
        // .../api/aircraft/mark/$id
        public async Task<IActionResult> DeleteMarkedAircraft(string id)
        {
            var userEmail = User.Identity.Name;

            var result = _aircraftManager.RemoveMark(userMail, id);

            if (result.Item1)
            {
                return Ok(new {
                    Success = true;
                    Result = "You have successfully unmarked a flight";
                });
            }
            
            return BadRequest(new {
                Success = false;
                ErrorCode = "";
                ErrorMessage = result.Item2;
            });
        }

        public class MarkAircraftInput 
        {
            [Required]
            public string FlightNr { get; set; }
        }
    }
}
