import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status =
        typeof rpcError.status === 'number'
          ? rpcError.status
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return response.status(status).json({
        status,
        message: rpcError.message,
      });
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: rpcError,
    });
  }
}