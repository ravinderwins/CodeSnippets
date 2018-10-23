using System;
using System.Collections.Generic;
using System.Text;

namespace DITSPortal.Services.StaticResource
{
    public static class StaticResource
    {
        public const int successStatusCode = 200;
        public const int failStatusCode = 400;
        public const string SomethingWrong = "Something went wrong";

        #region Configuration 
        public const string NoConfigurationFound = "No Configuration Found";
        public const string ConfigurationCreated = "Configuration has created";
        public const string ConfigurationNotCreated = "Configuration has not created";
        public const string ConfigurationUpdated = "Configuration has updated";
        public const string ConfigurationNotUpdated = "Configuration has not updated";
        #endregion
    }
}
