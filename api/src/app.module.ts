import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { SchemasModule } from './schemas/schemas.module';
import { IssuerService } from './issuer/issuer.service';
import { ClientApiModule } from './clientapi/clientapi.module';

// IMPORTS - START
// IMPORTS - END

@Module({
  imports: [
    // MODULE IMPORTS - START
    AuthModule,
    UsersModule,
    ProjectsModule,
    SchemasModule,
    ClientApiModule,
    // MODULE IMPORTS - END
  ],
  controllers: [
    // MODULE CONTROLLERS - START
    // MODULE CONTROLLERS - END
  ],
  providers: [
    // MODULE PROVIDERS - START
    IssuerService,
    // MODULE PROVIDERS - END
  ],
})
export class AppModule {}
