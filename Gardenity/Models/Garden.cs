using System;
using System.Data.Entity;

namespace Gardenity.Models
{
	public class Garden
    {
        public int GardenID { get; set; }
        public DateTime CreationDate { get; set; }

        public ICollection<User_Garden> User_Gardens { get; set; }
        public ICollection<Plot> Plots { get; set; }
    }
}

