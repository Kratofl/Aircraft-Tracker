using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aircraft_Tracker.Core.Database.Tables
{
    public class ApplicationUser : IdentityUser
    {
        public IEnumerable<MarkedFlight> MarkedFlights { get; set; }
    }
}
