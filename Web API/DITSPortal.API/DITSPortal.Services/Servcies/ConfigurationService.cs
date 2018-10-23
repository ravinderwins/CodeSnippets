using AutoMapper;
using DITSPortal.Common.Request;
using DITSPortal.Common.Response;
using DITSPortal.DataAccess.DBEntities;
using DITSPortal.DataAccess.IDataAccess;
using DITSPortal.Services.APIResponse;
using DITSPortal.Services.IServcies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DITSPortal.Services.Servcies
{
    public class ConfigurationService : IConfigurationService
    {

        private readonly IConfigurationRepository _IConfigureRepository;
        private APIResponse.APIResponse response;
        private readonly IMapper _mapper;
        public ConfigurationService(IConfigurationRepository IConfigureRepository, IMapper mapper)
        {

            _IConfigureRepository = IConfigureRepository;
            _mapper = mapper;
            response = new APIResponse.APIResponse();
        }

        public APIResponse.APIResponse GetConfigurationDataList()
        {
            try
            {
                var ConfigureList = _IConfigureRepository.GetAll();
                if (ConfigureList != null)
                {
                    IEnumerable<ConfigurationResponse> ConfigurationDataList = _mapper.Map<IEnumerable<ConfigurationResponse>>(ConfigureList);
                    response.data.ConfigurationData = ConfigurationDataList;
                    response.StatusCode = StaticResource.StaticResource.successStatusCode;
                }
                else
                {
                    response.Message = StaticResource.StaticResource.NoConfigurationFound;
                    response.StatusCode = StaticResource.StaticResource.failStatusCode;
                }
            }
            catch
            {
                response.StatusCode = StaticResource.StaticResource.failStatusCode;
                response.Message = StaticResource.StaticResource.SomethingWrong;
            }
            return response;
        }

        public APIResponse.APIResponse GetConfigurationById(ConfigurationRequest model)
        {
            try
            {
                Configuration data = _IConfigureRepository.GetSingle(x => x.ConfigurationId == model.ConfigurationId);
                ConfigurationResponse configurationDataResponse = _mapper.Map<ConfigurationResponse>(data);
                if (configurationDataResponse != null)
                {
                        response.StatusCode = StaticResource.StaticResource.successStatusCode;
                        response.data.Configure = configurationDataResponse;
                }
                else
                {
                    response.StatusCode = StaticResource.StaticResource.failStatusCode;
                    response.Message = StaticResource.StaticResource.NoConfigurationFound;
                }

            }
            catch
            {
                response.StatusCode = StaticResource.StaticResource.failStatusCode;
                response.Message = StaticResource.StaticResource.SomethingWrong;
            }
            return response;
        }

        public async Task<APIResponse.APIResponse> CreateConfiguration(CreateConfigurationRequest model)
        {
            try
            {
                Configuration configurationModel = _mapper.Map<Configuration>(model);
                configurationModel.CreatedBy = "admin";
                configurationModel.CreatedOn = DateTime.Now;
                bool IsAdded = await _IConfigureRepository.AddAsync(configurationModel);
                if (IsAdded)
                {
                    response.StatusCode = StaticResource.StaticResource.failStatusCode;
                    response.Message = StaticResource.StaticResource.ConfigurationCreated;
                }
                else
                {
                    response.StatusCode = StaticResource.StaticResource.failStatusCode;
                    response.Message = StaticResource.StaticResource.ConfigurationNotCreated;
                }
            }
            catch(Exception ex)
            {
                response.StatusCode = StaticResource.StaticResource.failStatusCode;
                response.Message = StaticResource.StaticResource.SomethingWrong;
            }
            return response;
        }

        public async Task<APIResponse.APIResponse> UpdateConfiguration(EditConfigurationRequest model)
        {
            try
            {
                Configuration configuration = _IConfigureRepository.GetSingle(x => x.ConfigurationId == model.ConfigurationId);
                if (configuration != null)
                {
                    configuration.ModifiedOn = DateTime.Now;
                    configuration.ModifiedBy = "Admin";
                    configuration.Name = model.Name;
                    configuration.Value = model.Value;
                   await  _IConfigureRepository.UpdateAsync(configuration);
                    
                    response.StatusCode = StaticResource.StaticResource.successStatusCode;
                    response.Message = StaticResource.StaticResource.ConfigurationUpdated;
                }
                else
                {
                    response.StatusCode = StaticResource.StaticResource.failStatusCode;
                    response.Message = StaticResource.StaticResource.ConfigurationNotUpdated;
                }
            }
            catch
            {
                response.Message = StaticResource.StaticResource.SomethingWrong;
                response.StatusCode = StaticResource.StaticResource.failStatusCode;
            }
            return response;
        }

    }
}
