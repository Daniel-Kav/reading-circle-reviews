import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';
import { LikesModule } from './likes/likes.module';
import { PersonalLibraryModule } from './personal-library/personal-library.module';
import { ClubModule } from './club/club.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl:true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    BooksModule,
    ReviewsModule,
    TagsModule,
    LikesModule,
    PersonalLibraryModule,
    ClubModule,
    MembershipModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
