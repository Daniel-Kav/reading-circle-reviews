
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  create(@Body() createClubDto: CreateClubDto, @Body('userId') userId: string) {
    return this.clubService.create(createClubDto, userId);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.clubService.getUserClubs(userId);
    }
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clubService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateClubDto: UpdateClubDto, @Body('userId') userId: string) {
    return this.clubService.update(id, updateClubDto, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Body('userId') userId: string) {
    return this.clubService.remove(id, userId);
  }
}
