using DITSPortal.Common.Response;
using System;
using System.Collections.Generic;
using System.Text;

namespace DITSPortal.Services.APIResponse
{
    public class APIResponse
    {
        public APIResponse()
        {
            data = new data();
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public data data { get; set; }
    }

    public class data
    {
        public IEnumerable<ConfigurationResponse> ConfigurationData { get; set; }
        public ConfigurationResponse Configure { get; set; }
    }
    
}
