using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;

namespace VRL.API.Services;

public class VendorService
{
    
    private readonly VrlDbContext _context;
    private readonly AuditLogService _auditLogService;
    private readonly CurrentUserService _currentUserService;
    public VendorService(VrlDbContext context, AuditLogService auditLogService, CurrentUserService currentUserService)
    {
        _context = context;
        _auditLogService = auditLogService;
        _currentUserService = currentUserService;
    }

    public async Task<List<Vendor>> GetVendorsAsync()
    {
        return await _context.Vendors.Where(v => !v.IsDeleted).ToListAsync();
    }

    public async Task<Vendor> CreateVendorAsync(Vendor vendor)
    {
        vendor.CreatedDate = DateTime.UtcNow;

        _context.Vendors.Add(vendor);

        await _context.SaveChangesAsync();
        await _auditLogService.LogAsync(
                "Vendor",
                vendor.VendorId,
                "Created",
                _currentUserService.Username,
                $"Vendor {vendor.VendorName} created");

            return vendor;
    }

    public async Task<bool> UpdateVendorAsync(int id, Vendor vendor)
    {
        var existingVendor = await _context.Vendors.FindAsync(id);

        if (existingVendor == null)
            return false;

        existingVendor.VendorName = vendor.VendorName;
        existingVendor.VendorType = vendor.VendorType;
        existingVendor.ContactEmail = vendor.ContactEmail;
        existingVendor.Website = vendor.Website;
        existingVendor.RiskRating = vendor.RiskRating;
        existingVendor.IsActive = vendor.IsActive;
        existingVendor.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
            await _auditLogService.LogAsync(
            "Vendor",
            existingVendor.VendorId,
            "Updated",
            _currentUserService.Username,
            $"Vendor {existingVendor.VendorName} updated");
        return true;
    }

    public async Task<bool> DeleteVendorAsync(int id)
    {
        var vendor = await _context.Vendors.FindAsync(id);

        if (vendor == null)
            return false;

        vendor.IsDeleted = true;
        vendor.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        await _auditLogService.LogAsync(
            "Vendor",
            vendor.VendorId,
            "Deleted",
            _currentUserService.Username,
            $"Vendor {vendor.VendorName} deleted");
        return true;
    }

    public async Task<Vendor?> GetVendorByIdAsync(int id)
    {
        return await _context.Vendors
            .FirstOrDefaultAsync(v => v.VendorId == id);
    }

     public async Task<List<VendorTypes>> GetVendorTypesAsync()
    {
        return await _context.VendorTypes.ToListAsync();
    }

    public async Task<List<Users>> GetActiveUser()
    {
        return await _context.Users.Where(u => u.IsActive).OrderBy(u => u.FirstName).ToListAsync();
    }
}