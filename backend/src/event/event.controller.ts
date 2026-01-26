import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { ValidationErrorResponseDto } from '../common/dto/validation-error-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { IdParamValidationPipe } from '../common/validation/pipes/id-param-validation.pipe';
import { EventService } from './event.service';
import { EventResponseDto } from './dto/event-response';
import { CreateRentalDto } from './dto/create-rental.dto';
import { CreateLossDto } from './dto/create-loss.dto';
import { CreateReturnDto } from './dto/create-return.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { EventListResponseDto } from './dto/event-list-response';

@ApiBearerAuth('JWT')
@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiCreatedResponse({ type: EventResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Post('rental')
  @HttpCode(201)
  @MinRole(UserRole.MANAGER)
  async createRental(@Body() dto: CreateRentalDto): Promise<EventResponseDto> {
    const data = await this.eventService.createRental(dto);
    return { data };
  }

  @ApiCreatedResponse({ type: EventResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Post('loss')
  @HttpCode(201)
  @MinRole(UserRole.MANAGER)
  async createLoss(@Body() dto: CreateLossDto): Promise<EventResponseDto> {
    const data = await this.eventService.createLoss(dto);
    return { data };
  }

  @ApiCreatedResponse({ type: EventResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Post('return')
  @HttpCode(201)
  @MinRole(UserRole.MANAGER)
  async createReturn(@Body() dto: CreateReturnDto): Promise<EventResponseDto> {
    const data = await this.eventService.createReturn(dto);
    return { data };
  }

  @ApiExtraModels(EventQueryDto)
  @ApiOkResponse({ type: EventListResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @Get()
  @MinRole(UserRole.MANAGER)
  async findAll(@Query() query: EventQueryDto): Promise<EventListResponseDto> {
    const { data, total } = await this.eventService.findAll(query);
    return {
      data,
      meta: { total },
    };
  }

  @ApiOkResponse({ type: EventResponseDto })
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get(':id')
  async findOne(
    @Param('id', IdParamValidationPipe) id: number,
  ): Promise<EventResponseDto> {
    const data = await this.eventService.findOne(id);
    return { data };
  }

  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ValidationErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiForbiddenResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Delete(':id')
  @HttpCode(204)
  @MinRole(UserRole.ADMIN)
  async delete(@Param('id', IdParamValidationPipe) id: number): Promise<void> {
    await this.eventService.delete(id);
    return;
  }
}
