using Aircraft_Tracker.Core.Database.Tables;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aircraft_Tracker.Core.Database.Manager
{
    public class AircraftManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDbContextFactory<ApplicationDbContext> _context;

        public AircraftManager(IDbContextFactory<ApplicationDbContext> context, UserManager<ApplicationUser> userManager)
        {
            this._context = context;
            this._userManager = userManager;
        }

        public async Task<Tuple<bool, string>> AddNewMarkAsync(string userEmail, string flightNr)
        {
            using var db = _context.CreateDbContext();
            var user = await _userManager.FindByEmailAsync(userEmail);

            var markedFlight = new MarkedFlight
            {
                FlightNr = flightNr,
                UserId = user.Id,
            };

            try
            {
                db.MarkedFlights.Add(markedFlight);
                db.SaveChanges();
                return Tuple.Create(true, "Marking flight was successful.");
            }
            catch (Exception e)
            {
                return Tuple.Create(false, "Marking flight has failed.");
            }
        }

        public async Task<Tuple<bool, string>> RemoveMarkAsync(string userEmail, Guid markedFlightId)
        {
            using var db = _context.CreateDbContext();
            var user = await _userManager.FindByEmailAsync(userEmail);

            var markedFlight = db.MarkedFlights.AsNoTracking().FirstOrDefault(x => x.Id == markedFlightId);

            if (markedFlight == null)
            {
                return Tuple.Create(false, "Marked flight could not be found");
            }

            try
            {
                db.MarkedFlights.Remove(markedFlight);
                db.SaveChanges();
                return Tuple.Create(true, "Removing mark was successful");
            }
            catch (Exception e)
            {
                return Tuple.Create(false, "Removing mark has failed");
            }

        }
    }
}
