using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualFormBuilder.Repository.IRepository;
using VisualFormBuilder.Service.IService;

namespace VisualFormBuilder.Service.Service
{
    public class FormBuilderService: IFormBuilderService
    {
        #region Private

        private IFormBuilderRepository _IFormBuilderRepository;

        #endregion

        public FormBuilderService(IFormBuilderRepository IFormBuilderRepository)
        {
            _IFormBuilderRepository = IFormBuilderRepository;
        }

  
    }
}
