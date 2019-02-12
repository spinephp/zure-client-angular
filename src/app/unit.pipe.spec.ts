import { UnitPipe } from './unit.pipe';

describe('UnitPipe', () => {
  let pipe;
  it('create an instance', () => {
    pipe = new UnitPipe();
    expect(pipe).toBeTruthy();
  });
  it('should work with empty string', () => {
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform('')).toEqual('');
  });
  it('should work with real string', () => {
    expect(pipe.transform('"', 0)).toEqual('inch');
    expect(pipe.transform('"', 1)).toEqual('英寸');
    expect(pipe.transform('mm', 0)).toEqual('millimeter');
    expect(pipe.transform('mm', 1)).toEqual('毫米');
  });
});
