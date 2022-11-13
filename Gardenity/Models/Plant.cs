using System;

namespace Gardenity.Models
{
	public class Plant
	{
		public int PlantID { get; set; }
		public string Status { get; set; }
		public int PlotID { get; set; }
		public int PlantTypeID { get; set; }


		public Plot Plot { get; set; }
		public PlantType Type { get; set; }
	}
}

