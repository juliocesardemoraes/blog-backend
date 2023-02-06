import { AppModule } from '../app.module';

describe('AuthDefined', () => {
  it('should be defined', async () => {
    expect(new AppModule()).toBeDefined();
  });
});
