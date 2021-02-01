import { Logger, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenResponse, AuthenticationClient } from 'auth0';
@Injectable({})
export class AuthClientService {
  private authConfig: any = this.configService.get('auth', {});
  private logger = new Logger(AuthClientService.name);
  private client_id: string;
  private api_audience: string;
  private client_secret: string;
  private auth0_domain: string;
  private authClient: AuthenticationClient;
  public constructor(
    private http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.auth0_domain = this.authConfig.auth0_domain;
    this.client_id = this.authConfig.client_id;
    this.api_audience = this.authConfig.api_audience;
    this.client_secret = this.authConfig.client_secret;
    this.authClient = new AuthenticationClient({
      clientId: this.client_id,
      domain: this.auth0_domain,
      clientSecret: this.client_secret,
    });
  }

  public async getToken(audience = this.api_audience): Promise<string> {
    this.logger.debug(
      `Getting auth token for audience ${this.api_audience} for client ${this.client_id}`,
    );

    const token: TokenResponse = await this.authClient
      .clientCredentialsGrant({
        audience: audience,
      })
      .catch((err) => {
        this.logger.error(err);
        throw err;
      });

    return token.access_token;
  }
}
