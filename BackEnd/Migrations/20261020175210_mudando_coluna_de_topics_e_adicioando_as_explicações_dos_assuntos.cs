using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class mudando_coluna_de_topics_e_adicioando_as_explicações_dos_assuntos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PointsXp",
                table: "RoadmapLessons");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "RoadmapTopics",
                newName: "Challenge");

            migrationBuilder.AddColumn<string>(
                name: "ExplanationOfTheSubject",
                table: "RoadmapLessons",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExplanationOfTheSubject",
                table: "RoadmapLessons");

            migrationBuilder.RenameColumn(
                name: "Challenge",
                table: "RoadmapTopics",
                newName: "Description");

            migrationBuilder.AddColumn<int>(
                name: "PointsXp",
                table: "RoadmapLessons",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
