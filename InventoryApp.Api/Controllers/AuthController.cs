using BCrypt.Net;
using InventoryApp.Api.Data;
using InventoryApp.Api.DTO;
using InventoryApp.Api.Models;
using InventoryApp.Api.Models.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace InventoryApp.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtSettings _jwt;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _jwt = config.GetSection("Jwt").Get<JwtSettings>()
            ?? throw new Exception("JWT settings not found");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var username = request.Username?.Trim();
        var password = request.Password?.Trim();

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            return Unauthorized("Credenciales inválidas");

        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
            return Unauthorized("Usuario inválido");

        // 
        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return Unauthorized("Credenciales inválidas");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim("role", user.Role.Name)
        };
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwt.Key)
        );

        var token = new JwtSecurityToken(
            issuer: "https://localhost:7182",
            audience: "http://localhost:5173",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(600),
            signingCredentials: new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            )
        );

        return Ok(new LoginResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Role = user.Role.Name
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var username = request.Username.Trim();
        var password = request.Password.Trim();

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            return BadRequest("Datos inválidos");

        // Verificar si existe
        var exists = await _context.Users.AnyAsync(u => u.Username == username);
        if (exists)
            return BadRequest("El usuario ya existe");

        var user = new User
        {
            Username = username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            RoleId = 2 // USER
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Usuario creado correctamente");
    }
}
