using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using VRL.API.Services;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VendorsController : ControllerBase
{
   private readonly VendorService _vendorService;

    public VendorsController(VendorService vendorService)
    {
        _vendorService = vendorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetVendors()
    {
        var vendors = await _vendorService.GetVendorsAsync();

        return Ok(new ApiResponse<List<Vendor>>
        {
            Success = true,
            Message = "Vendors retrieved successfully",
            Data = vendors
        });
    }

    [HttpPost]
    public async Task<IActionResult> CreateVendor(Vendor vendor)
    {
        var createdVendor = await _vendorService.CreateVendorAsync(vendor);

        return Ok(new ApiResponse<Vendor>
        {
            Success = true,
            Message = "Vendor created successfully",
            Data = vendor
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVendor(int id, Vendor vendor)
    {
        var updated = await _vendorService.UpdateVendorAsync(id, vendor);

        if (!updated)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Vendor not found"
            });
        }

        return Ok(new ApiResponse<Vendor>
        {
            Success = true,
            Message = "Vendor updated successfully",
            Data = vendor
        });
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> DeleteVendor(int id)
    {
        var deleteVendor = await _vendorService.DeleteVendorAsync(id);


        if (deleteVendor)
        {
            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Vendor deleted successfully" 
            });
        }   

        return Ok(new ApiResponse<object>
        {
            Success = false,
            Message = "Vendor not found" 
        });   
    }

}