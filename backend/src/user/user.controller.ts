import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserRole } from './enums/user-role.enum';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/jwt/guards/roles.guard';
import { MinRole } from '../auth/jwt/decorators/min-role.decorator';
import { AuthUser } from '../auth/jwt/decorators/auth-user.decorator';
import type { JwtPayload } from '../auth/jwt/interfaces/jwt-payload.interface';
import { UserListResponseDto } from './dto/user-list-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ValidationErrorResponseDto } from '../common/dto/validation-error-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { IdParamValidationPipe } from '../common/validation/pipes/id-param-validation.pipe';

@ApiBearerAuth('JWT')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Post()
  @HttpCode(201)
  @MinRole(UserRole.ADMIN)
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const data = await this.userService.create(dto);
    return { data };
  }

  @ApiExtraModels(UserQueryDto)
  @ApiOkResponse({ type: UserListResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @Get()
  @MinRole(UserRole.MANAGER)
  async findAll(@Query() query: UserQueryDto): Promise<UserListResponseDto> {
    const { data, total } = await this.userService.findAll(query);
    return {
      data,
      meta: { total },
    };
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get(':id')
  async findOne(
    @Param('id', IdParamValidationPipe) id: number,
  ): Promise<UserResponseDto> {
    const data = await this.userService.findOne(id);
    return { data };
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Patch(':id')
  async update(
    @Param('id', IdParamValidationPipe) id: number,
    @Body() dto: UpdateUserDto,
    @AuthUser() authUser: JwtPayload,
  ): Promise<UserResponseDto> {
    const data = await this.userService.update(id, dto, authUser);
    return { data };
  }

  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', IdParamValidationPipe) id: number,
    @AuthUser() authUser: JwtPayload,
  ): Promise<void> {
    await this.userService.delete(id, authUser);
    return;
  }
}
