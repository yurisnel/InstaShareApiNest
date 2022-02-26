import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { IProfileInput } from '../profile.entity';

export class ProfileDto implements IProfileInput {
  @ApiPropertyOptional({ type: Number })
  readonly id?: number;

  @ApiPropertyOptional({
    default:
      'Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.',
  })
  readonly about?: string;

  @ApiPropertyOptional({
    default: 'Lueilwitz, Wisoky and Leuschke',
  })
  readonly company?: string;

  @ApiPropertyOptional({
    default: 'Web development',
  })
  readonly job?: string;

  @ApiPropertyOptional({
    default: 'A108 Adam Street, New York, NY 535022',
  })
  readonly address?: string;

  @ApiPropertyOptional({
    default: '(436) 486-3538 x29071',
  })
  readonly phone?: string;

  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class ProfileUserDto extends IntersectionType(UserDto, ProfileDto) {}
