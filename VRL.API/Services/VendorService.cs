using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;

namespace VRL.API.Services;

public class VendorService
{
    private readonly VrlDbContext _context;

    public VendorService(VrlDbContext context)
    {
        _context = context;
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

        return true;
    }

    public async Task<Vendor?> GetVendorByIdAsync(int id)
    {
        return await _context.Vendors
            .FirstOrDefaultAsync(v => v.VendorId == id);
    }
}