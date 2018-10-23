using AutoMapper;
using DITSPortal.Common.Request;
using DITSPortal.DataAccess.DBEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DITSPortal.Services.AutoMapper.Mappings
{
    public class ModelToEntityMappingProfile : Profile
    {
        public ModelToEntityMappingProfile()
        {
            CreateMap<CreateConfigurationRequest, Configuration>();
        }
    }
}