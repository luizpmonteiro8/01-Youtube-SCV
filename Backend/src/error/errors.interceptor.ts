import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const code = err.code;
        console.log('code', code);
        console.log(Object.keys(err));
        console.log(err.name);
        console.log(err.response);

        if (err.name.includes('NotFoundError'))
          throw new NotFoundException('Registro não encontrado.');
        if (err.response?.message) {
          throw new ConflictException(err.response.message[0]);
        }

        switch (code) {
          case 'P2002':
            if (err.message.includes('name')) {
              throw new ConflictException(
                'Um registro com esse nome já existe.',
              );
            }
          case 'P2025':
            throw new NotFoundException('Registro não encontrado.');
          case 'P2003':
            throw new NotFoundException('Registro externo não encontrado.');

          default:
            throw new BadGatewayException();
        }
      }),
    );
  }
}
