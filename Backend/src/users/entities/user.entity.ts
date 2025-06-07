
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { ReviewLike } from '../../likes/entities/like.entity';
import { PersonalLibrary } from '../../personal-library/entities/personal-library.entity';
import { Club } from '../../club/entities/club.entity';
import { Membership } from '../../membership/entities/membership.entity';

export enum UserRole {
  FARMER = 'farmer',
  RESEARCHER = 'researcher',
  ADMIN = 'admin'
}

@Entity('profiles')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  full_name: string;

  @Column({ type: 'text', nullable: true })
  organization: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.FARMER })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  avatar_url: string;

  @Column('text', { array: true, nullable: true })
  favorite_genres: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => ReviewLike, like => like.user)
  likes: ReviewLike[];

  @OneToMany(() => PersonalLibrary, library => library.user)
  personal_library: PersonalLibrary[];

  @OneToMany(() => Club, club => club.created_by_user)
  created_clubs: Club[];

  @OneToMany(() => Membership, membership => membership.user)
  memberships: Membership[];
}
