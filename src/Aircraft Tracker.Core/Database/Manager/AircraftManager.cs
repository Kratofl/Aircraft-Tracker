using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aircraft_Tracker.Core.Database.Manager
{
    public class AircraftManager {
        
        public Tuple<bool, string> AddNewMark(string userEmail, string flightNr) {
            using var db = new ApplcationDbContext();

            var user = db.Users.AsNoTracking().FirstOrDefault(x => x.NormalizedEmail == userEmail.ToUpper());

            var markedFlight = new MarkedFlight{
                FlightNr = flightNr;
                User = user;
            }


            try {
                db.MarkedFlights.Add(markedFlight);
                db.SaveChanges();
                return Tuple.create(true, "Marking flight was successful.");
            } catch (Exception e) {
                return Tuple.create(false, "Marking flight has failed.");
            }
        }

        public Tuple<bool, string> RemoveMark(string userMail, Guid markedFlightId) {
            using var db = new ApplcationDbContext();

            var user = db.Users.AsNoTracking().FirstOrDefault(x => x.NormalizedEmail == userEmail.ToUpper());

            var markedFlight = db.MarkedFlights.AsNoTracking().FirstOrDefault(x => x.Id == markedFlightId);

            try {
                db.MarkedFlights.Remove(markedFlight);
                db.SaveChanges();
                return Tuple.create(true, "Removing mark was successful");
            } catch (Exception e) {
                return Tuple.create(false, "Removing mark has failed");
            }
        }
    }
}
