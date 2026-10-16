using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class Mudando_os_nomes_das_colunas_da_tabela_UserTechProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdUserTechProfile",
                table: "UserTechProfiles",
                newName: "RoadmapId");

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "UserTechProfiles",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Language",
                table: "UserTechProfiles");

            migrationBuilder.RenameColumn(
                name: "RoadmapId",
                table: "UserTechProfiles",
                newName: "IdUserTechProfile");
        }
    }
}
