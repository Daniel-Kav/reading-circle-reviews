
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BooksService } from './books/books.service';
import { ClubService } from './club/club.service';
import { UsersService } from './users/users.service';

async function seedData() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const booksService = app.get(BooksService);
  const clubService = app.get(ClubService);
  const usersService = app.get(UsersService);
  
  const userId = '56963768-b972-41a7-8cf1-826544da7199';
  
  try {
    // Create sample books
    const books = await Promise.all([
      booksService.create({
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        isbn: '9780307454546',
        description: 'A gripping thriller about a journalist and a hacker uncovering dark secrets.',
        cover_image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        genre: 'thriller',
        page_count: 465,
        tag_ids: []
      }),
      booksService.create({
        title: 'Atomic Habits',
        author: 'James Clear',
        isbn: '9780735211292',
        description: 'An easy and proven way to build good habits and break bad ones.',
        cover_image_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
        genre: 'self-help',
        page_count: 320,
        tag_ids: []
      }),
      booksService.create({
        title: 'The Martian',
        author: 'Andy Weir',
        isbn: '9780553418026',
        description: 'A stranded astronaut must survive on Mars using science and ingenuity.',
        cover_image_url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
        genre: 'science fiction',
        page_count: 369,
        tag_ids: []
      })
    ]);
    
    // Create sample clubs
    const clubs = await Promise.all([
      clubService.create({
        name: 'The Mystery Solvers',
        description: 'A club dedicated to unraveling the best mystery and thriller novels.',
        cover_image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
        is_private: false
      }, userId),
      clubService.create({
        name: 'Sci-Fi Explorers',
        description: 'Journey through galaxies and alternate realities with fellow science fiction enthusiasts.',
        cover_image_url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600',
        is_private: false
      }, userId)
    ]);
    
    console.log('Sample data created successfully!');
    console.log(`Created ${books.length} books and ${clubs.length} clubs`);
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await app.close();
  }
}

seedData();
