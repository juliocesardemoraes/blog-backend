import { MongoExceptionFilter } from '../mongoErrorHandling';
import { HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

describe('MongoExceptionFilter', () => {
  let filter: MongoExceptionFilter;
  let host: any;
  let response: any;
  let request: any;

  beforeEach(() => {
    filter = new MongoExceptionFilter();
    host = {
      switchToHttp: jest.fn(() => {
        return {
          getResponse: jest.fn(() => response),
          getRequest: jest.fn(() => request),
        };
      }),
    };
    response = {
      status: jest.fn(() => response),
      json: jest.fn(() => response),
    };
    request = {
      url: '/test',
    };
  });

  it('should return INTERNAL_SERVER_ERROR status code when MongoError code is 11000', () => {
    const error = new MongoError('Test error');
    error.code = 11000;
    filter.catch(error, host);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: expect.any(String),
      path: request.url,
      error: error.message,
    });
  });

  it('should return BAD_REQUEST status code when MongoError code is not 11000', () => {
    const error = new MongoError('Test error');
    filter.catch(error, host);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: expect.any(String),
      path: request.url,
      error: error.message,
    });
  });
});
