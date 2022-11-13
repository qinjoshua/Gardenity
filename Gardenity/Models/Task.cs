using System;
namespace Gardenity.Models
{
    public enum Status
    {
        COMPLETED, IN_PROGRESS, NOT_STARTED
    }

    public class Task
	{
		public int TaskID { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
        public string Type { get; set; }
		public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
		public DateTime? AssignedDate { get; set; }
		public DateTime DueDate { get; set; }
		public string UserID { get; set; }
		public int PlantID { get; set; }

		public Plant Plant { get; set; }

	}
}

