import pathUtils from '../path' ;

describe('segment1D', () => {
  it('should return an array of resolution values', () => {
    const resolution = 5;
    expect(pathUtils.segment1D(0, 10, resolution)).toHaveLength(resolution);
  });

  it('should return values between a and b', () => {
    expect(pathUtils.segment1D(0, 10, 10)).toBe([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
