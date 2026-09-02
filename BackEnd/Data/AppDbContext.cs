using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
namespace BackEnd.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Users> AppUsers {get;set;}

        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options)
        {}
        
    }
};