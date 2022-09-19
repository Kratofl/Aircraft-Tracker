using Aircraft_Tracker.Core.Api.OpenSky;
using Aircraft_Tracker.Core.Database.Manager;
using Aircraft_Tracker.Core.Database.Tables;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Aircraft_Tracker.Web.Controllers.api
{
    [ApiController]
    [Route("api/[controller]")]
    public class AircraftController : Controller
    {
        private readonly AircraftManager _aircraftManager;

        public AircraftController(AircraftManager aircraftManager)
        {
            this._aircraftManager = aircraftManager;
        }

        [HttpPost]
        [Route("mark")]
        public async Task<IActionResult> MarkAircraft([FromBody]MarkAircraftInput input)
        {
            var userEmail = User.Identity.Name;

            var result = await _aircraftManager.AddNewMarkAsync(userEmail, input.FlightNr);

            if (result.Item1)
            {
                return Ok(new {
                    Success = true,
                    Result = result.Item2,
                });
            }
            
            return BadRequest(new {
                Success = false,
                ErrorCode = "",
                ErrorMessage = result.Item2,
            });
        }
        public class MarkAircraftInput
        {
            [Required] public string FlightNr { get; set; }
        }

        [HttpDelete]
        [Route("mark")]
        public async Task<IActionResult> DeleteMarkedAircraft(Guid id)
        {
            var userEmail = User.Identity.Name;

            var result = await _aircraftManager.RemoveMarkAsync(userEmail, id);

            if (result.Item1)
            {
                return Ok(new {
                    Success = true,
                    Result = result.Item2,
                });
            }
            
            return BadRequest(new {
                Success = false,
                ErrorCode = "",
                ErrorMessage = result.Item2,
            });
        }
    }
}
