using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DITSPortal.DataAccess.Migrations
{
    public partial class AddFiledsIn_BaseEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedDate",
                table: "Configurations",
                type: "Datetime",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Configurations",
                type: "Datetime",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Configurations",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "Configurations",
                type: "Datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Configurations");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "Configurations");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedDate",
                table: "Configurations",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Datetime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Configurations",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Datetime");
        }
    }
}
