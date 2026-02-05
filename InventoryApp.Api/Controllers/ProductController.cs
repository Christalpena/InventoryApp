using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using InventoryApp.Api.Data;
using InventoryApp.Api.Models;
using InventoryApp.Api.DTO;

namespace InventoryApp.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/admin/products")]
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }

    // GET
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var products = await _context.Products
            .Include(p => p.CreatedByUser)
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Description,
                p.Quantity,
                CreatedBy = p.CreatedByUser.Username
            })
            .ToListAsync();

        return Ok(products);
    }

    // POST
    [HttpPost]
    public async Task<IActionResult> Create(ProductDTO product)
    {
        var newProduct = new Product()
        {
            CreatedByUserId = GetUserId(),
            Name = product.Name,
            Quantity = product.Quantity,
            Description = product.Description,
        };
        _context.Products.Add(newProduct);
        await _context.SaveChangesAsync();
        return Ok(product);
    }

    // PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProductDTO dto)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Quantity = dto.Quantity;

        await _context.SaveChangesAsync();

        return Ok(product);
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        var deleted = new DeletedProduct
        {
            Name = product.Name,
            Description = product.Description,
            Quantity = product.Quantity,
            CreatedByUserId = product.CreatedByUserId,
            DeletedByUserId = GetUserId(),
            DeletedAt = DateTime.UtcNow
        };

        _context.DeletedProducts.Add(deleted);
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
