import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//@HEADERTYPE
/* headers {
    host: 'localhost:8000',
        project: 'abc',
        authorization: 'MeupaiÃ©assimblablabla Bearer',
  }

 */

@Injectable()
export class ProjectNameMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, path: url, headers } = request;

        /*        const authorizationHeader = headers['authorization'];
               if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                   response.status(401).json({ error: 'JWT token não informado!' });
                   return;
               }
               const jwtToken = authorizationHeader.slice(7);  */



        const projectHeader = headers['project'];
        if (projectHeader != "abc") {
            response.status(401).json({ error: 'Projeto informado errado' });
            return;
        }

        next();
    }
}







