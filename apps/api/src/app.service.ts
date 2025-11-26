import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Return a simple greeting.
   * @returns "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }
}
