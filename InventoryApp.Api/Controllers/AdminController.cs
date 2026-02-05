using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryApp.Api.Data;
using Microsoft.AspNetCore.Authorization;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
   
}
namespace InventoryApp.Api.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todos los usuarios
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Role)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    Role = u.Role.Name,
                    u.CreatedAt
                })
                .ToListAsync();

            return Ok(users);
        }

        
        [HttpGet("deleted-products")]
        public async Task<IActionResult> GetDeletedProducts()
        {
            return Ok(await _context.DeletedProducts.ToListAsync());
        }
    }
}
