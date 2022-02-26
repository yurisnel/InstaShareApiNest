import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ResponseDto {
  @ApiProperty({
    default: 'true',
  })
  readonly success: boolean;

  @ApiProperty({
    default: 'Successful operation',
  })
  readonly message: string;

  @ApiPropertyOptional({
    default: 'empty',
  })
  @IsOptional()
  readonly data?: string;
}
