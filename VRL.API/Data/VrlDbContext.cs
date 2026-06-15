using Microsoft.EntityFrameworkCore;
using VRL.API.Models;

namespace VRL.API.Data;

public class VrlDbContext : DbContext
{
    public VrlDbContext(DbContextOptions<VrlDbContext> options)
        : base(options)
    {
    }

    public DbSet<Vendor> Vendors { get; set; }
    public DbSet<Incident> Incidents {get; set;}
    public DbSet<Users> Users {get; set;}
    public DbSet<IncidentType> IncidentTypes {get; set;}
    public DbSet<IncidentPriorities> IncidentPriorities {get; set;}
    public DbSet<IncidentSeverities> IncidentSeverities {get; set;}
    public DbSet<IncidentStatuses> IncidentStatuses {get; set;}

}