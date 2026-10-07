using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class UserStack
    {
        [Key]
        public int IdStack { get; set; }
        
        public string Specialty { get; set; }
        public string Stack { get; set; }

        [ForeignKey("User")]
        public int IdUser { get; set; }
        public Users User { get; set; }
    }
}
