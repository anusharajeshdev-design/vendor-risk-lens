using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VendorsController : ControllerBase
{
    private readonly VrlDbContext _context;

    public VendorsController(VrlDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetVendors()
    {
        var vendors = await _context.Vendors.ToListAsync();

        return Ok(vendors);
    }

    [HttpPost]
    public async Task<IActionResult> CreateVendor(Vendor vendor)
    {
        _context.Vendors.Add(vendor);

        await _context.SaveChangesAsync();

        return Ok(vendor);
    }
}