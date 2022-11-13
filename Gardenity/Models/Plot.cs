using System;
namespace Gardenity.Models
{
	public class Plot
	{
		public int PlotID { get; set; }
		public string Coordinates { get; set; }
		public string Status { get; set; }
		public int GardenID { get; set; }

		public Garden Garden { get; set; }
		public ICollection<Plant> Plants { get; set; }
	}
}

