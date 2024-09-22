import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Roles } from '../auth/roles.decorator';
import { ERole } from '../auth/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get('treatment/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  findByTreatment(@Param('id') id: string) {
    return this.feedbackService.getFeedbacksByTreatmentId(+id);
  }

  // Endpoint para buscar um feedback por ID
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: CreateFeedbackDto,
    @GetUser() user: any,
  ) {
    return this.feedbackService.update(+id, updateFeedbackDto, user);
  }

  // Endpoint para deletar um feedback por ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  remove(@Param('id') id: string, @GetUser() user: any) {
    return this.feedbackService.remove(+id, user);
  }
}
