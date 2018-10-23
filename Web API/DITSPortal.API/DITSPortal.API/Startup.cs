using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DITSPortal.DataAccess.Data;
using DITSPortal.DataAccess.DataAccess;
using DITSPortal.DataAccess.IDataAccess;
using DITSPortal.Services.IServcies;
using DITSPortal.Services.Servcies;
using ElmahCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace DITSPortal.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add elmah Service
            services.AddElmah();

            // Add MVC Service
            services.AddMvc();

            // Setup database connection string
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //Dependency injection in ASP.NET Core
            services.AddTransient(typeof(IRepository<>), typeof(BaseRepository<>));
            services.AddTransient<IConfigurationService, ConfigurationService>();
            services.AddTransient<IConfigurationRepository, ConfigurationRepository>();
            
            //Add Mapper
            services.AddAutoMapper();

            //Add Swagger service
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "DITSPortal API", Version = "v1" });
            });

            // Log Error in file
            //services.AddElmah<XmlFileErrorLog>(options =>
            //{
            //    options.LogPath = Configuration.GetValue<string>("ErrorLogXml:FilePath");   // OR options.LogPath = "с:\errors";
            //});

            // Log Error in sql
            // DB structure see here: https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-db-SQLServer.sql
            services.AddElmah<SqlErrorLog>(options =>
            {
                options.ConnectionString = Configuration.GetConnectionString("DefaultConnection");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseElmah();
            app.UseMvc();

            app.UseSwagger();
            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "DITSPortal API V1");
                //  c.SwaggerEndpoint("/DueDiligerAPI/swagger/v1/swagger.json", "DueDiligerWeb API V1");
            });
        }
    }
}
