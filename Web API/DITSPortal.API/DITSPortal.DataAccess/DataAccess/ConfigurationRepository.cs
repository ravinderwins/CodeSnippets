using DITSPortal.Common.Request;
using DITSPortal.DataAccess.Data;
using DITSPortal.DataAccess.DBEntities;
using DITSPortal.DataAccess.IDataAccess;
using System;
using System.Collections.Generic;
using System.Text;

namespace DITSPortal.DataAccess.DataAccess
{
   public class ConfigurationRepository : BaseRepository<Configuration>, IConfigurationRepository
    {
        ApplicationDbContext ObjContext;
        public ConfigurationRepository(ApplicationDbContext context) : base(context)
        {
            ObjContext = context;
        }

    }
}
