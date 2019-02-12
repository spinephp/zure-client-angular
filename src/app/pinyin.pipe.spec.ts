import { PinyinPipe } from './pinyin.pipe';

describe('PinginPipe', () => {
  let pipe;
  it('create an instance', () => {
    pipe = new PinyinPipe();
    expect(pipe).toBeTruthy();
  });
  it('should work with empty string', () => {
    expect(pipe.transform()).toEqual('');
  });
  it('should work with empty string', () => {
    expect(pipe.transform('王')).toEqual('wang');
    expect(pipe.transform('张三')).toEqual('zhangsan');
  });
});
