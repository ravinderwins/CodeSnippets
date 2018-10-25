using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VisualFormBuilder.Service.IService;

namespace VisualFormBuilder.API.Controllers
{
    [RoutePrefix("FormBuilderAPI")]
    public class FormBuilderAPIController : ApiController
    {
        #region Private

        private IFormBuilderService _IFormBuilderService = null;
        private System.Net.Http.HttpResponseMessage httpResponseMessage = null;

        #endregion

        public FormBuilderAPIController(IFormBuilderService IFormBuilderService)
        {
            _IFormBuilderService = IFormBuilderService;
        }

        #region Public

        

        #endregion
    }
}
