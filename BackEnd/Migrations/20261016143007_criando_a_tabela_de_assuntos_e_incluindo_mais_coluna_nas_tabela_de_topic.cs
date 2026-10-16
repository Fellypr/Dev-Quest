using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class criando_a_tabela_de_assuntos_e_incluindo_mais_coluna_nas_tabela_de_topic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RoadmapTopics",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PercentProgress",
                table: "RoadmapTopics",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PointsXpTotal",
                table: "RoadmapTopics",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "RoadmapLessons",
                columns: table => new
                {
                    IdLesson = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoadmapTopicId = table.Column<int>(type: "integer", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: true),
                    PointsXp = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoadmapLessons", x => x.IdLesson);
                    table.ForeignKey(
                        name: "FK_RoadmapLessons_RoadmapTopics_RoadmapTopicId",
                        column: x => x.RoadmapTopicId,
                        principalTable: "RoadmapTopics",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoadmapLessons_RoadmapTopicId",
                table: "RoadmapLessons",
                column: "RoadmapTopicId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoadmapLessons");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "RoadmapTopics");

            migrationBuilder.DropColumn(
                name: "PercentProgress",
                table: "RoadmapTopics");

            migrationBuilder.DropColumn(
                name: "PointsXpTotal",
                table: "RoadmapTopics");
        }
    }
}
