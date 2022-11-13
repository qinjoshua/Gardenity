using System;
using System.ComponentModel.DataAnnotations;

namespace Gardenity.Models
{
	public class User
	{
		public int UserID { get; set; }
		public string EmailAddress { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
		public byte[] ProfilePicture { get; set; }

		public ICollection<User_Garden> User_Gardens { get; set; }
		public ICollection<Task> Tasks { get; set; }
	}
}

