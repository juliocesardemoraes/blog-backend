import { Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class MongooseErrorFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: any): any {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(400).json({
      statusCode: 400,
      createdBy: 'ValidationErrorFilter, Schema or Model definition',
      errors: exception,
    });
  }
}
