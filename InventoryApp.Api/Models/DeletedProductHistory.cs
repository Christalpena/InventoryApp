namespace InventoryApp.Api.Models;

public class DeletedProduct
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }

    public int CreatedByUserId { get; set; }
    public int DeletedByUserId { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime DeletedAt { get; set; } = DateTime.UtcNow;
}
