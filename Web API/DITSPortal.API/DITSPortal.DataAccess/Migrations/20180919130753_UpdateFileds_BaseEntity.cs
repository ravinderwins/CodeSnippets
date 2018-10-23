using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DITSPortal.DataAccess.Migrations
{
    public partial class UpdateFileds_BaseEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Configurations");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "Configurations");

            migrationBuilder.RenameColumn(
                name: "ModifiedDate",
                table: "Configurations",
                newName: "CreatedOn");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Configurations",
                type: "Datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Configurations",
                type: "Datetime",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Configurations");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Configurations");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Configurations",
                newName: "ModifiedDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Configurations",
                type: "Datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "Configurations",
                type: "Datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
