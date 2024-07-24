import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDTO {

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