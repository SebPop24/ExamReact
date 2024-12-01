using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Exam.Models;

namespace Exam.DAL;

public class ItemDbContext : IdentityDbContext
{
    //Constructor initializes with DbContext options.
    public ItemDbContext(DbContextOptions<ItemDbContext> options) : base(options)
    {
    }

    //Configures lazy loading for the Items DbSet.
    public DbSet<Item> Items { get; set; } = default!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }
}
