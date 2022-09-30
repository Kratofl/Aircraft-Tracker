using Aircraft_Tracker.Core.Api.OpenSky;
using Microsoft.AspNetCore.Mvc;
using Aircraft_Tracker.Core.Api.exceptions;

namespace Aircraft_Tracker.Web.Controllers.api
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenSkyController : Controller
    {
        private readonly OpenSky _openSky;

        public OpenSkyController(OpenSky openSky)
        {
            _openSky = openSky;
        }

        [HttpGet]
        [Route("flights/all")]
        public async Task<IActionResult> GetAllFlights(long begin, long end)
        {
            try
            {
                var result = await _openSky.GetAllFlightsAsync(begin, end);

                return Ok(result);
            }
            catch (RequestNotSuccessfullException e)
            {
                return BadRequest(new
                {
                    ErrorCode = "",
                    ErrorMessage = e.Message
                });
            }
        }

        [HttpGet]
        [Route("flights/aircraft")]
        public async Task<IActionResult> GetFlightsOfAircraft(long begin, long end, string icao24)
        {
            try
            {
                var result = await _openSky.GetFlightsOfAircraftAsync(begin, end, icao24);

                return Ok(result);
            }
            catch (RequestNotSuccessfullException e)
            {
                return BadRequest(new
                {
                    ErrorCode = "",
                    ErrorMessage = e.Message
                });
            }
        }

        [HttpGet]
        [Route("states/all")]
        public async Task<IActionResult> GetAllStates()
        {
            try
            {
                var result = await _openSky.GetAllStatesAsync();

                return Ok(result);
            }
            catch (RequestNotSuccessfullException e)
            {
                return BadRequest(new
                {
                    ErrorCode = "",
                    ErrorMessage = e.Message
                });
            }
        }

        [HttpGet]
        [Route("airport/departure")]
        public async Task<IActionResult> GetAirportsDepartures(long begin, long end, string airport)
        {
            try
            {
                var result = await _openSky.GetAirportsDeparturesAsync(begin, end, airport);

                return Ok(result);
            }
            catch (RequestNotSuccessfullException e)
            {
                return BadRequest(new
                {
                    ErrorCode = "",
                    ErrorMessage = e.Message
                });
            }
        }

        [HttpGet]
        [Route("airport/arrival")]
        public async Task<IActionResult> GetAirportsArrivals(long begin, long end, string airport)
        {
            try
            {
                var result = await _openSky.GetAirportsArrivalsAsync(begin, end, airport);

                return Ok(result);
            }
            catch (RequestNotSuccessfullException e)
            {
                return BadRequest(new
                {
                    ErrorCode = "",
                    ErrorMessage = e.Message
                });
            }
        }
    }
}
