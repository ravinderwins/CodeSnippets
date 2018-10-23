using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DITSPortal.Common.Request
{
    public class ConfigurationRequest
    {
        public int ConfigurationId { get; set; }
    }

    public class CreateConfigurationRequest
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(50)]
        public string Value { get; set; }
    }
    public class EditConfigurationRequest
    {
        public int ConfigurationId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(50)]
        public string Value { get; set; }
    }
}
