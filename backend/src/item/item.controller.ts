import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemQueryDto } from './dto/item-query.dto';
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
import { RolesGuard } from '../auth/jwt/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { MinRole } from '../auth/jwt/decorators/min-role.decorator';
import { UserRole } from '../user/enums/user-role.enum';
import { ItemResponseDto } from './dto/item-response.dto';
import { ItemListResponseDto } from './dto/item-list-response.dto';
import { ValidationErrorResponseDto } from '../common/dto/validation-error-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { IdParamValidationPipe } from '../common/validation/pipes/id-param-validation.pipe';

@ApiBearerAuth('JWT')
@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiCreatedResponse({ type: ItemResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Post()
  @HttpCode(201)
  @MinRole(UserRole.MANAGER)
  async create(@Body() dto: CreateItemDto): Promise<ItemResponseDto> {
    const data = await this.itemService.create(dto);
    return { data };
  }

  @ApiExtraModels(ItemQueryDto)
  @ApiOkResponse({ type: ItemListResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @Get()
  @MinRole(UserRole.MANAGER)
  async findAll(@Query() query: ItemQueryDto): Promise<ItemListResponseDto> {
    const { data, total } = await this.itemService.findAll(query);
    return {
      data,
      meta: { total },
    };
  }

  @ApiOkResponse({ type: ItemResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get(':id')
  async findOne(
    @Param('id', IdParamValidationPipe) id: number,
  ): Promise<ItemResponseDto> {
    const data = await this.itemService.findOne(id);
    return { data };
  }

  @ApiOkResponse({ type: ItemResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Patch(':id')
  @MinRole(UserRole.MANAGER)
  async update(
    @Param('id', IdParamValidationPipe) id: number,
    @Body() dto: UpdateItemDto,
  ): Promise<ItemResponseDto> {
    const data = await this.itemService.update(id, dto);
    return { data };
  }

  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Delete(':id')
  @HttpCode(204)
  @MinRole(UserRole.MANAGER)
  async delete(@Param('id', IdParamValidationPipe) id: number): Promise<void> {
    await this.itemService.delete(id);
    return;
  }
}
