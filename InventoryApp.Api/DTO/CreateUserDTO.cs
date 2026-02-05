namespace InventoryApp.Api.DTO
{
    public class CreateUserDTO
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int RoleId { get; set; } // 1 = Admin, 2 = User
    }
}
