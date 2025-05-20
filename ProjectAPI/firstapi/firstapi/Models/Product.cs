using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace firstapi.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = "";

        [Required]
        [Column("brand")]
        public string Brand { get; set; } = "";

        [Required]
        [Column("category")]
        public string Category { get; set; } = "";

        [Required]
        [Column("price")]
        public decimal Price { get; set; }

        [Required]
        [Column("description")]
        public string Description { get; set; } = "";

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}

