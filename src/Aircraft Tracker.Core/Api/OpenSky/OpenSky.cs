using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aircraft_Tracker.Core.Api.OpenSky
{
    public class OpenSky : Api
    {
        public OpenSky() : base("https://opensky-network.org/api") { }

        public async Task<string> GetAllStatesAsync()
        {
            return await GetRequestAsync("states/all");
        }

        public async Task<string> GetAllFlightsAsync(long begin, long end)
        {
            Dictionary<string, string> paramsDict = new Dictionary<string, string>();
            paramsDict.Add("begin", begin.ToString());
            paramsDict.Add("end", end.ToString());

            return await GetRequestAsync("flights/all", paramsDict);
        }

        public async Task<string> GetAirportsArrivalsAsync(long begin, long end, string airport)
        {
            Dictionary<string, string> paramsDict = new Dictionary<string, string>();
            paramsDict.Add("begin", begin.ToString());
            paramsDict.Add("end", end.ToString());
            paramsDict.Add("airport", airport);

            return await GetRequestAsync("flights/arrival", paramsDict);
        }

        public async Task<string> GetAirportsDeparturesAsync(long begin, long end, string airport)
        {
            Dictionary<string, string> paramsDict = new Dictionary<string, string>();
            paramsDict.Add("begin", begin.ToString());
            paramsDict.Add("end", end.ToString());
            paramsDict.Add("airport", airport);

            return await GetRequestAsync("flights/departure", paramsDict);
        }

        public async Task<string> GetFlightsOfAircraftAsync(long begin, long end, string icao24)
        {
            Dictionary<string, string> paramsDict = new Dictionary<string, string>();
            paramsDict.Add("begin", begin.ToString());
            paramsDict.Add("end", end.ToString());
            paramsDict.Add("icao24", icao24);

            return await GetRequestAsync("flights/aircraft", paramsDict);
        }
    }
}
