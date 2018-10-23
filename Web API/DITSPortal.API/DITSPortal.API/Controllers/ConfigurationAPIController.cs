using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DITSPortal.Common.Request;
using DITSPortal.Services.APIResponse;
using DITSPortal.Services.IServcies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DITSPortal.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[Action]")]
    public class ConfigurationAPIController : Controller
    {
        private readonly IConfigurationService _clientService;
        private readonly JsonSerializerSettings _serializerSettings;
        private APIResponse response;
        public ConfigurationAPIController(IConfigurationService clientService)
        {
            _clientService = clientService;
            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore
            };
            response = new APIResponse();
        }

        /// <summary>
        /// Get Configuration
        /// </summary>
        /// <returns>Returns list of configurations.</returns> 
        [HttpGet]
        public IActionResult GetConfigurationDataList()
        {
            try
            {
                throw new Exception("DivideByZeroException");
                //response = _clientService.GetConfigurationDataList();
                //var json = JsonConvert.SerializeObject(response, _serializerSettings);
                //return new OkObjectResult(json);
            }
            catch { throw; }
        }

        [HttpPost]
        public IActionResult GetConfigurationById([FromBody]ConfigurationRequest model)
        {
            try
            {
                response = _clientService.GetConfigurationById(model);
                var json = JsonConvert.SerializeObject(response, _serializerSettings);
                return new OkObjectResult(json);
            }
            catch { throw; }
        }

        [HttpPost]
        public async Task<IActionResult> CreateConfiguration([FromBody]CreateConfigurationRequest model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                response = await _clientService.CreateConfiguration(model);
                var json = JsonConvert.SerializeObject(response, _serializerSettings);
                return new OkObjectResult(json);
            }
            catch { throw; }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateConfiguration([FromBody]EditConfigurationRequest model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                response = await _clientService.UpdateConfiguration(model);
                var json = JsonConvert.SerializeObject(response, _serializerSettings);
                return new OkObjectResult(json);
            }
            catch { throw; }
        }
    }
}