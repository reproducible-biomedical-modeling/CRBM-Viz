import { Test } from '@nestjs/testing';
import { AuthClientService } from './auth-client.service';
import { HttpModule } from '@nestjs/common';
import { AuthenticationClient, TokenResponse } from 'auth0';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('AuthClientService', () => {
  let service: AuthClientService;
  let authClient: AuthenticationClient;
  const MockConfigSerivce = {
    get: (key: string, def: any) => {
      return {
        client_id: 'id',
        client_secret: 'secret',
        auth0_domain: 'domain/', // THe domain in the config ends with /
        api_audience: 'audience',
      };
    },
  };
  const mockClient = {
    clientCredentialsGrant: (audience: string) => {
      return of({
        access_token: 'test_acces_token',
        token_type: 'client_credentials',
        expires_in: 100,
      }).toPromise();
    },
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AuthClientService,
        { provide: ConfigService, useValue: MockConfigSerivce },
      ],
    }).compile();

    service = module.get(AuthClientService);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.authClient = mockClient;
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  it('should set config', () => {
    expect((service as any).auth0_domain).toBe(
      MockConfigSerivce.get('', '').auth0_domain,
    );
    expect((service as any).client_secret).toBe(
      MockConfigSerivce.get('', '').client_secret,
    );
    expect((service as any).client_id).toBe(
      MockConfigSerivce.get('', '').client_id,
    );
    expect((service as any).api_audience).toBe(
      MockConfigSerivce.get('', '').api_audience,
    );
  });
  it('should call client_credentials method', async () => {
    const result: TokenResponse = {
      access_token: 'test_acces_token',
      token_type: 'client_credentials',
      expires_in: 100,
    };
    const spy = jest
      .spyOn(mockClient, 'clientCredentialsGrant')
      .mockImplementationOnce(() => of(result).toPromise());
    const token = await service.getToken();
    expect(token).toBe(result.access_token);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({
      audience: MockConfigSerivce.get('', '').api_audience,
    });
  });
  it('should override auidence', async () => {
    const result: TokenResponse = {
      access_token: 'test_acces_token',
      token_type: 'client_credentials',
      expires_in: 100,
    };
    const spy = jest
      .spyOn(mockClient, 'clientCredentialsGrant')
      .mockImplementationOnce(() => of(result).toPromise());
    const testAudience = 'testAPIAudience';
    const token = await service.getToken(testAudience);
    expect(token).toBeTruthy();
    expect(spy).toHaveBeenCalledWith({
      audience: testAudience,
    });
  });
  it('should return token', async () => {
    const result: TokenResponse = {
      access_token: 'test_access_token',
      token_type: 'client_credentials',
      expires_in: 100,
    };
    const spy = jest
      .spyOn(mockClient, 'clientCredentialsGrant')
      .mockImplementationOnce(() => of(result).toPromise());
    const token = await service.getToken();

    expect(token).toBe(result.access_token);
  });
});
