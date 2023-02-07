import { AuthModule } from '../auth.module';

describe('AuthDefined', () => {
  it('should be defined', async () => {
    expect(new AuthModule()).toBeDefined();
  });
});
