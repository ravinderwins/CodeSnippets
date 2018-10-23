using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DITSPortal.DataAccess.DataAccess
{
    public class Audit
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string TableName { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime DateTime { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string KeyValues { get; set; }
        [Column(TypeName = "varchar(max)")]
        public string OldValues { get; set; }
        [Column(TypeName = "varchar(max)")]
        public string NewValues { get; set; }
    }
}
