import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import * as mongoose from 'mongoose';

@Catch(
  mongoose.mongo.MongoServerError,
  mongoose.Error.ValidationError,
  mongoose.Error.CastError,
)
export class MongoErrorFilter implements ExceptionFilter {
  catch(exception: mongoose.mongo.MongoServerError, host: ArgumentsHost) {
    console.log('===========');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const logger = new Logger(exception.name);
    logger.error(exception.message);

    if (exception.code === 11000) {
      const message = exception.message.split(':').slice(-2).join(':').trim();
      response.status(HttpStatus.CONFLICT).json({
        error: exception.name,
        statusCode: HttpStatus.CONFLICT,
        message: `Duplicate key error - ${message}`,
      });
    } else {
      response.status(HttpStatus.CONFLICT).json({
        error: exception.name,
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
      });
    }
  }
}
