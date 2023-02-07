import { MongooseErrorFilter } from '../mongooseErrorHandling';
import { Error } from 'mongoose';

describe('MongooseErrorFilter', () => {
  let filter: MongooseErrorFilter;
  let host: any;
  let response: any;

  beforeEach(() => {
    filter = new MongooseErrorFilter();
    host = {
      switchToHttp: jest.fn(() => {
        return {
          getResponse: jest.fn(() => response),
        };
      }),
    };
    response = {
      status: jest.fn(() => response),
      json: jest.fn(() => response),
    };
  });

  it('should return 400 Bad Request response with validation error details', () => {
    const exception = new Error.ValidationError();
    exception.errors = {
      name: {
        kind: 'test',
        value: 'test',
        message: 'Name is required',
        stringValue: 'testee',
        name: null,
        path: 'testte',
      },
    };
    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: 400,
      createdBy: 'ValidationErrorFilter, Schema or Model definition',
      errors: exception,
    });
  });
});
