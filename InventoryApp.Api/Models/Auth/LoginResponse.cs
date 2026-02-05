namespace InventoryApp.Api.Models.Auth;

public class LoginResponse
{
    public string Token { get; set; } = null!;
    public string Role { get; set; } = null!;
}
