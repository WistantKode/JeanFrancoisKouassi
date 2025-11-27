import { User as PrismaUser, UserRole, UserStatus, Gender } from '@prisma/client';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserEntity implements PrismaUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false, nullable: true })
  phone: string | null;

  @ApiProperty({ enum: Gender, required: false, nullable: true })
  gender: Gender | null;

  @ApiProperty({ required: false, nullable: true })
  dateOfBirth: Date | null;

  @ApiProperty({ required: false, nullable: true })
  city: string | null;

  @ApiProperty({ required: false, nullable: true })
  region: string | null;

  @ApiProperty()
  country: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty({ required: false, nullable: true })
  emailVerifiedAt: Date | null;

  @ApiProperty({ required: false, nullable: true })
  verificationToken: string | null;

  @ApiProperty({ required: false, nullable: true })
  passwordResetToken: string | null;

  @ApiProperty({ required: false, nullable: true })
  passwordResetExpires: Date | null;

  @ApiProperty({ required: false, nullable: true })
  lastLoginAt: Date | null;

  @ApiProperty({ required: false, nullable: true })
  lastLoginIp: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updated: Date;
}

export class PublicUserDto extends OmitType(UserEntity, [
  'password',
  'verificationToken',
  'passwordResetToken',
  'passwordResetExpires',
  'lastLoginIp',
] as const) {}
