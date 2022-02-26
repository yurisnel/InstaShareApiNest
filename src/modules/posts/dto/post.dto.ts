import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostDto {
  @ApiPropertyOptional({
    default: 'autoincrement()',
    type: Number,
  })
  readonly id?: number;

  @ApiProperty({
    default: 'Mi primer post',
  })
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @ApiProperty({
    default: 'Este es el contenido de mi primer post',
  })
  @IsNotEmpty()
  readonly body: string;
}
