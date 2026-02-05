using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryApp.Api.Data;

namespace InventoryApp.Api.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/history")]
public class AdminHistoryController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminHistoryController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetHistory()
    {
        var history = await _context.DeletedProducts
            .Join(
                _context.Users,
                d => d.CreatedByUserId,
                u => u.Id,
                (d, creator) => new { d, creator }
            )
            .Join(
                _context.Users,
                x => x.d.DeletedByUserId,
                u => u.Id,
                (x, deleter) => new
                {
                    x.d.Id,
                    x.d.Name,
                    x.d.Description,
                    x.d.Quantity,
                    CreatedBy = x.creator.Username,
                    DeletedBy = deleter.Username,
                    x.d.DeletedAt
                }
            )
            .OrderByDescending(x => x.DeletedAt)
            .ToListAsync();

        return Ok(history);
    }

    // DELETE
    [HttpDelete]
    public async Task<IActionResult> ClearHistory()
    {
        _context.DeletedProducts.RemoveRange(_context.DeletedProducts);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Historial eliminado correctamente" });
    }
}
