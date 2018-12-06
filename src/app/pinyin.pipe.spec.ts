import { PinyinPipe } from './pinyin.pipe';

describe('PinginPipe', () => {
  it('create an instance', () => {
    const pipe = new PinyinPipe();
    expect(pipe).toBeTruthy();
  });
});
