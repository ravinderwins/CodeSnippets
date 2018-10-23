using DITSPortal.Common.Request;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DITSPortal.Services.IServcies
{
    public interface IConfigurationService
    {
        APIResponse.APIResponse GetConfigurationDataList();
        APIResponse.APIResponse GetConfigurationById(ConfigurationRequest ConfigurationRequest);
        Task<APIResponse.APIResponse> CreateConfiguration(CreateConfigurationRequest model);
        Task<APIResponse.APIResponse> UpdateConfiguration(EditConfigurationRequest model);
    }
    
}
