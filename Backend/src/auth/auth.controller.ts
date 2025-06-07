
import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SupabaseJwtAuthGuard } from './supabase-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      const user = await this.authService.register(createAuthDto);
      return {
        success: true,
        message: 'User registered successfully',
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @UseGuards(SupabaseJwtAuthGuard)
  @Post('sync')
  async syncUser(@Request() req, @Body() userData: any) {
    try {
      const userId = req.user.sub; // Supabase JWT contains user ID in 'sub' field
      const user = await this.authService.syncUser(userId, {
        id: userId,
        full_name: userData.full_name,
        role: userData.role || 'farmer',
      });
      
      return {
        success: true,
        message: 'User synced successfully',
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @UseGuards(SupabaseJwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req) {
    try {
      const userId = req.user.sub;
      const user = await this.authService.validateUser(userId);
      
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
      
      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
