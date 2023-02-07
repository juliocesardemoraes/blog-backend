import { UsersModule } from './../users.module';

describe('AuthDefined', () => {
  it('should be defined', async () => {
    expect(new UsersModule()).toBeDefined();
  });
});
