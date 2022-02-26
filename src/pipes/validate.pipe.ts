import { Injectable, ArgumentMetadata, ValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    return await super.transform(value, metadata);
  }
}
