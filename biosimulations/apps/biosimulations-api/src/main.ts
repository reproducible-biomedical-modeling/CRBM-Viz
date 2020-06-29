import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { json } from 'body-parser';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('server.port');
  const host = configService.get('server.host');
  const limit = configService.get('server.limit');

  app.use(json({ limit }));
  setupOpenApi(app);

  await app.listen(port, () => {
    console.log('Listening at ' + host);
  });
}

function setupOpenApi(app: INestApplication) {
  // TODO abstract this to common library, use env variables
  const oauthSchema: SecuritySchemeObject = {
    type: 'oauth2',
    flows: {
      implicit: {
        authorizationUrl:
          'https://auth.biosimulations.org/authorize?audience=api.biosimulations.org',
        scopes: [],
      },
    },
  };
  const openIDSchema: SecuritySchemeObject = {
    type: 'openIdConnect',
    openIdConnectUrl:
      'https://auth.biosimulations.org/.well-known/openid-configuration',
  };
  const options = new DocumentBuilder()
    .setTitle('Biosimulations Resource API')
    .setDescription('The API to interact with the Biosimulations Database')
    .setVersion('0.1')
    .addTag('Models')
    .addTag('Projects')
    .addTag('Simulations')
    .addTag('Charts')
    .addTag('Visualizations')
    .addSecurity('OpenIdc', openIDSchema)
    .addOAuth2(oauthSchema)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  const uiOptions = {
    oauth: {
      clientId: 'mfZoukkw1NCTdltQ0KhWMn9KXVNq7gfT',
    },
  };
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Biosimulations API Documentation',

    swaggerOptions: uiOptions,
    customCss: ' .swagger-ui .topbar { display: none }',
  };
  SwaggerModule.setup('', app, document, customOptions);
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/openapi.json', (req, res) => res.json(document));
}
bootstrap();
