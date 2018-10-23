using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DITSPortal.DataAccess.DBEntities
{
    public class Configuration : BaseEntity
    {
        [Key]
        public int ConfigurationId { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string Value { get; set; }
    }
}
