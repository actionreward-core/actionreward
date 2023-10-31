import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { SchemasModule } from './schemas/schemas.module';
import { IssuerService } from './issuer/issuer.service';
import { ClientApiModule } from './clientapi/clientapi.module';
import { StorageService } from './storage/storage.service';
import { RewardsModule } from './rewards/rewards.module';
import { CacheModule } from './cache/cache.module';
import { RawBodyMiddleware } from './common/middlewares/raw-body.middleware';
import { JsonBodyMiddleware } from './common/middlewares/json-body.middleware';
import { ConnectModule } from './connect/connect.module';
import { ActionsModule } from './actions/actions.module';
import { ProjectUsersModule } from './project-users/project-users.module';
import { DashboardModule } from './dashboard/dashboard.module';

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
    RewardsModule,
    CacheModule,
    ConnectModule,
    ActionsModule,
    ProjectUsersModule,
    DashboardModule,
    // MODULE IMPORTS - END
  ],
  controllers: [
    // MODULE CONTROLLERS - START
    // MODULE CONTROLLERS - END
  ],
  providers: [
    // MODULE PROVIDERS - START
    IssuerService,
    StorageService,
    // MODULE PROVIDERS - END
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes(
        {
          path: '/rewards/callback',
          method: RequestMethod.POST,
        },
        {
          path: '/connect/callback',
          method: RequestMethod.POST,
        },
      )
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
