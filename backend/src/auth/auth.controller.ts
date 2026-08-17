import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common'; 
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Post('signup')
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.authService.getProfile(+id);
  }

  
  @Put('profile/:id')
  updateProfile(@Param('id') id: string, @Body() body: any) {
    
    return this.authService.updateProfile(+id, body);
  }
}