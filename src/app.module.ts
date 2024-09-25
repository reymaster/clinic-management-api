import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TreatmentModule } from './treatment/treatment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ConfigModule } from '@nestjs/config';
import { TreatmentGroupModule } from './treatment-group/treatment-group.module';
import { TreatmentCategoryModule } from './treatment-category/treatment-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true, // Não usar synchronize em produção!
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    TreatmentModule,
    FeedbackModule,
    EquipmentModule,
    TreatmentGroupModule,
    TreatmentCategoryModule,
  ],
})
export class AppModule {}
