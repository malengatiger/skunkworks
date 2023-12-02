import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const mm = '🕖 🕗 🕘 LogElapsedTimeInterceptor 🌍';

@Injectable()
export class LogElapsedTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
        console.log(
          `${mm} Request: ${
            context.switchToHttp().getRequest().url
          } took 🥦 ${elapsedTime} seconds 🥦`,
        );
      }),
    );
  }
}
