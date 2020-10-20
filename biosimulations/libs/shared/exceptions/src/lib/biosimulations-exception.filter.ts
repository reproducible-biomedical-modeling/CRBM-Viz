import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ErrorObject,
  ErrorResponseDocument,
} from '@biosimulations/shared/datamodel-api';
import {
  BiosimulationsException,
  isBiosimulationsException,
} from './exception';

@Catch()
export class BiosimulationsExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException | BiosimulationsException | any,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let resbody: ErrorObject;
    if (isBiosimulationsException(exception)) {
      status = exception.getStatus();
      resbody = exception.getError();
    } else if (exception instanceof HttpException) {
      exception = BiosimulationsException.fromHTTP(exception);
      status = exception.getStatus();
      resbody = exception.getError();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      resbody = {
        status: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        title: 'Internal Server Error',
        detail: exception,
      };
    }
    resbody.meta = {
      time: Date.now(),
      url: request.url,
    };
    const responseError: ErrorResponseDocument = { error: [resbody] };
    response.status(status).json(responseError);
  }
}
