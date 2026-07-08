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
    public DbSet<VendorTypes> VendorTypes {get; set;}
    public DbSet<Roles> Roles {get; set;}
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Vendor>()
            .Property(v => v.CreatedDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Vendor>()
            .Property(v => v.UpdatedDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Vendor>()
            .Property(v => v.LastReviewDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Vendor>()
            .Property(v => v.NextReviewDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Incident>()
            .Property(i => i.ReportedDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Incident>()
            .Property(i => i.DueDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Incident>()
            .Property(i => i.ExpectedCloseDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Incident>()
            .Property(i => i.ActualCloseDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Incident>()
            .Property(i => i.CreatedDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Incident>()
            .Property(i => i.UpdatedDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<Users>()
            .Property(u => u.CreatedDate)
            .HasColumnType("timestamp without time zone");

        modelBuilder.Entity<AuditLog>()
            .Property(a => a.CreatedDate)
            .HasColumnType("timestamp without time zone");

        base.OnModelCreating(modelBuilder);
    }
}