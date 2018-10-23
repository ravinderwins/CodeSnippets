using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DITSPortal.DataAccess.Migrations
{
    public partial class Added_Audit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.CreateTable(
                name: "Audits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TableName = table.Column<string>(type: "varchar(250)", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    KeyValues = table.Column<string>(type: "varchar(50)", nullable: true),
                    OldValues = table.Column<string>(type: "varchar(max)", nullable: true),
                    NewValues = table.Column<string>(type: "varchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Audits", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Audits");

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "Datetime", nullable: false),
                    DeletedBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "Datetime", nullable: true),
                    FirstName = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    LastName = table.Column<string>(type: "varchar(50)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "Datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                });
        }
    }
}
