using Microsoft.EntityFrameworkCore;

namespace Gardenity.Models
{
	public class GardenContext : DbContext
	{
		public GardenContext(DbContextOptions<GardenContext> options) : base(options)
        {
		}

		public DbSet<Garden> Gardens { get; set; }
		public DbSet<User_Garden> UserGardens { get; set; }
		public DbSet<Plot> Plots { get; set; }
		public DbSet<Plant> Plants { get; set; }
		public DbSet<PlantType> PlantTypes { get; set; }
		public DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Garden>().ToTable("Garden");
            modelBuilder.Entity<Task>().ToTable("Task");
            modelBuilder.Entity<PlantType>().ToTable("PlantType");
            modelBuilder.Entity<Plant>().ToTable("Plant");
            modelBuilder.Entity<User_Garden>().ToTable("User_Garden");
            modelBuilder.Entity<Plot>().ToTable("Plot");
        }
    }
}

