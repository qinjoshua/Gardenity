using System;
namespace Gardenity.Models
{
	public class User_Garden
	{
		public int User_GardenID { get; set; }
		public string UserID { get; set; }
		public int GardenID { get; set; }

		public Garden Garden { get; set; }
	}
}

