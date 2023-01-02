import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const code = err.code;
        console.log('code', code);
        console.log(Object.keys(err));
        console.log('meta', err.meta);
        console.log(err.name);
        console.log(err.response);
        console.log(Object.keys(context));
        console.log('args', context.getArgs()[0].url);
        console.log('args', context.getArgs()[0].method);

        if (err.name.includes('NotFoundError'))
          throw new NotFoundException('Registro não encontrado.');
        if (err.response?.message && context.getArgs()[0].url != '/login') {
          throw new ConflictException(err.response.message[0]);
        }
        if (err.response?.message && context.getArgs()[0].url == '/login') {
          throw new NotFoundException(
            typeof err.response.message == 'string'
              ? err.response.message
              : err.response.message[0],
          );
        }

        switch (code) {
          case 'P2002':
            if (err.message.includes('name')) {
              throw new ConflictException(
                'Um registro com esse nome já existe.',
              );
            }
            if (err.message.includes('cpf')) {
              throw new ConflictException(
                'Um registro com esse cpf já existe.',
              );
            }
            if (err.message.includes('email')) {
              throw new ConflictException(
                'Um registro com esse email já existe.',
              );
            }
          case 'P2025':
            throw new NotFoundException('Registro não encontrado.');
          case 'P2003':
            if (context.getArgs()[0].method == 'DELETE') {
              throw new NotFoundException('Registro em uso.');
            } else {
              throw new NotFoundException('Registro externo não encontrado.');
            }
          default:
            throw new BadGatewayException();
        }
      }),
    );
  }
}
