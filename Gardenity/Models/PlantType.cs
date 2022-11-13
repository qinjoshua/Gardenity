using System;
namespace Gardenity.Models
{
	public class PlantType
	{
		public int PlantTypeID { get; set; }
		public string Name { get; set; }
		public int WaterFrequency { get; set; }

		public ICollection<Plant> Plants { get; set; }
	}
}

