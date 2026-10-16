using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
namespace BackEnd.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Users> AppUsers {get;set;}
        public DbSet<UserTechProfile> UserTechProfiles {get;set;}
        public DbSet<RoadmapTopics> RoadmapTopics {get;set;}
        public DbSet<RoadmapLessons> RoadmapLessons {get;set;}
        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTechProfile>()
                .HasOne(us => us.User)
                .WithMany(u => u.UserTechProfiles)
                .HasForeignKey(us => us.IdUser)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<RoadmapTopics>()
                .HasOne(us => us.UserTechProfiles)
                .WithMany(u => u.RoadmapTopics) 
                .HasForeignKey(us => us.RoadmapId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<RoadmapLessons>()
                .HasOne(us => us.RoadmapTopics)
                .WithMany(u => u.RoadmapLessons) 
                .HasForeignKey(us => us.RoadmapTopicId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
};