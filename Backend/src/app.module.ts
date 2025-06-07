
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

// Import entities
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import { Review } from './reviews/entities/review.entity';
import { Tag } from './tags/entities/tag.entity';
import { BookTag } from './books/entities/book-tag.entity';
import { ReviewLike } from './likes/entities/like.entity';
import { PersonalLibrary } from './personal-library/entities/personal-library.entity';
import { Club } from './club/entities/club.entity';
import { Membership } from './membership/entities/membership.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow<string>('DATABASE_URL'),
        entities: [User, Book, Review, Tag, BookTag, ReviewLike, PersonalLibrary, Club, Membership],
        autoLoadEntities: true,
        synchronize: true, // Set to false for production
        ssl: true,
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
