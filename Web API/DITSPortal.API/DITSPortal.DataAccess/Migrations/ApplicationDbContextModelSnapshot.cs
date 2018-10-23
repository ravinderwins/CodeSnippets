﻿// <auto-generated />
using System;
using DITSPortal.DataAccess.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DITSPortal.DataAccess.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DITSPortal.DataAccess.DataAccess.Audit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime");

                    b.Property<string>("KeyValues")
                        .HasColumnType("varchar(50)");

                    b.Property<string>("NewValues")
                        .HasColumnType("varchar(max)");

                    b.Property<string>("OldValues")
                        .HasColumnType("varchar(max)");

                    b.Property<string>("TableName")
                        .HasColumnType("varchar(250)");

                    b.HasKey("Id");

                    b.ToTable("Audits");
                });

            modelBuilder.Entity("DITSPortal.DataAccess.DBEntities.Configuration", b =>
                {
                    b.Property<int>("ConfigurationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CreatedBy")
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("Datetime");

                    b.Property<string>("DeletedBy")
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("Datetime");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("ModifiedBy")
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("Datetime");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Value")
                        .HasColumnType("varchar(50)");

                    b.HasKey("ConfigurationId");

                    b.ToTable("Configurations");
                });
#pragma warning restore 612, 618
        }
    }
}