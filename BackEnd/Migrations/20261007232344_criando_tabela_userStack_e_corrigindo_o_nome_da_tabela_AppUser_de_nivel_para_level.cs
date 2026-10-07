using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class criando_tabela_userStack_e_corrigindo_o_nome_da_tabela_AppUser_de_nivel_para_level : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nivel",
                table: "AppUsers",
                newName: "Level");

            migrationBuilder.CreateTable(
                name: "UserStacks",
                columns: table => new
                {
                    IdStack = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Specialty = table.Column<string>(type: "text", nullable: true),
                    Stack = table.Column<string>(type: "text", nullable: true),
                    IdUser = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStacks", x => x.IdStack);
                    table.ForeignKey(
                        name: "FK_UserStacks_AppUsers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "AppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserStacks_IdUser",
                table: "UserStacks",
                column: "IdUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserStacks");

            migrationBuilder.RenameColumn(
                name: "Level",
                table: "AppUsers",
                newName: "Nivel");
        }
    }
}
