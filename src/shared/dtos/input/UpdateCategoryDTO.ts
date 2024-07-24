import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDTO {
    @ApiProperty({
        example: "Mousepad 90x40"
    })
    name: string;

    @ApiProperty(
        {
            example: "Mousepad para trabalho e jogos."
        }
    )
    description: string;
}