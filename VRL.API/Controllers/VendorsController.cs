using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using VRL.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetVendorById(int id)
    {
        var vendor = await _vendorService.GetVendorByIdAsync(id);

        if (vendor == null)
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
            Message = "Vendor retrieved successfully",
            Data = vendor
        });
    }

    [HttpGet("types")]
    public async Task<IActionResult> GetVendorTypes()
    {
        var vendorTypes = await _vendorService.GetVendorTypesAsync();

        if(vendorTypes == null)
        {
            return NotFound(new ApiResponse<object>
            {
               Success = false,
               Message = "Vendor types not found" 
            });
        }

        return Ok(new ApiResponse<List<VendorTypes>>
        {
            Success = true,
            Message = "Vendor types retrieved successfully",
            Data = vendorTypes
        });
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveVendors()
    {
        var users = await _vendorService.GetActiveUser();

        return Ok(new ApiResponse<List<Users>>
        {
            Success = true,
            Message = "Active users retrieved successfully",
            Data = users
        });
    }
}