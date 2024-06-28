import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, catchError, map, throwError } from 'rxjs';

interface ReponseType<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ReponseType<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ReponseType<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          code: 0,
          extra: {},
          message: 'success',
        };
      }),
      catchError((error) => {
        const errorMessage =
          error.response?.message?.[0] ||
          error.message ||
          'Internal Server Error';
        const statusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        return throwError(
          new HttpException(
            {
              code: statusCode,
              data: null,
              message: errorMessage,
            },
            statusCode,
          ),
        );
      }),
    );
  }
}

export function setupInterceptors() {
  return [new TransformInterceptor()];
}
