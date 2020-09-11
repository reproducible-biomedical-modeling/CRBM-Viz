import { Module, HttpModule } from '@nestjs/common';
import {
  ClientsModule,
  ClientProxy,
  Transport,
  ClientProxyFactory,
  NatsOptions,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ConfigService } from '@nestjs/config';
import { BiosimulationsConfigModule } from '@biosimulations/config/nest';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

const dbUri = process.env.MONGO_URI || '';
@Module({
  imports: [
    BiosimulationsConfigModule,
    HttpModule,
    MongooseModule.forRoot(dbUri),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'DISPATCH_MQ',
      useFactory: (configService: ConfigService) => {
        const natsServerConfig = configService.get('nats');
        const natsOptions: NatsOptions = {};
        natsOptions.transport = Transport.NATS;
        natsOptions.options = natsServerConfig;
        return ClientProxyFactory.create(natsOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
