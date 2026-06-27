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
         _auditLogService.LogCreate(
            "Vendor",
            vendor.VendorId,
            vendor,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();

            return vendor;
    }

    public async Task<bool> UpdateVendorAsync(int id, Vendor vendor)
    {
        var existingVendor = await _context.Vendors.FindAsync(id);

        if (existingVendor == null)
            return false;

        var oldVendor = new Vendor
        {
            VendorId = existingVendor.VendorId,
            VendorName = existingVendor.VendorName,
            VendorType = existingVendor.VendorType,
            ContactEmail = existingVendor.ContactEmail,
            Website = existingVendor.Website,
            RiskRating = existingVendor.RiskRating,
            IsActive = existingVendor.IsActive,
            CreatedDate = existingVendor.CreatedDate,
            UpdatedDate = existingVendor.UpdatedDate,
            IsDeleted = existingVendor.IsDeleted
        };
        existingVendor.VendorName = vendor.VendorName;
        existingVendor.VendorType = vendor.VendorType;
        existingVendor.ContactEmail = vendor.ContactEmail;
        existingVendor.Website = vendor.Website;
        existingVendor.RiskRating = vendor.RiskRating;
        existingVendor.IsActive = vendor.IsActive;
        existingVendor.UpdatedDate = DateTime.UtcNow;

       _auditLogService.LogUpdate(
            "Vendor",
            existingVendor.VendorId,
            oldVendor,
            existingVendor,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();
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
        _auditLogService.LogDelete(
            "Vendor",
            vendor.VendorId,
            vendor,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();
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