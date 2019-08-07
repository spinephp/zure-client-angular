import { Userlogin } from './userlogin';

describe('Userlogin', () => {
  it('should create an instance', () => {
    expect(new Userlogin('xxx', '1234', '1111', 'custom', '111111111111111')).toBeTruthy();
  });
});
