using Microsoft.EntityFrameworkCore.Migrations;

namespace DITSPortal.DataAccess.Migrations
{
    public partial class ChangeBaseEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Configurations");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Configurations");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Configurations",
                type: "varchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Configurations",
                type: "varchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Configurations",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Configurations");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Configurations",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Configurations",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Configurations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedById",
                table: "Configurations",
                nullable: true);
        }
    }
}
