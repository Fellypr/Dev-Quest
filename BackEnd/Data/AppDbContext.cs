using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
namespace BackEnd.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Users> AppUsers {get;set;}
        public DbSet<UserStack> UserStacks {get;set;}
        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserStack>()
                .HasOne(us => us.User)
                .WithMany(u => u.UserStacks)
                .HasForeignKey(us => us.IdUser)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
};