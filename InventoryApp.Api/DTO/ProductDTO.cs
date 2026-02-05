using InventoryApp.Api.Models;

namespace InventoryApp.Api.DTO
{
    public class ProductDTO
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
