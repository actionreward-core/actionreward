import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

// IMPORTS - START
// IMPORTS - END

@Module({
  imports: [
    // MODULE IMPORTS - START
    UsersModule,
    // MODULE IMPORTS - END
  ],
  controllers: [
    // MODULE CONTROLLERS - START
    // MODULE CONTROLLERS - END
  ],
  providers: [
    // MODULE PROVIDERS - START
    // MODULE PROVIDERS - END
  ],
})
export class AppModule {}
