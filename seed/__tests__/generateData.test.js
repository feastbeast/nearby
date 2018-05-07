const generate = require('./../generateData');

describe('getRestaurantJson', () => {
  const json = generate.getRestaurantJson(1, 1);

  it('should be a string', () => {
    expect(typeof json).toBe('string');
  });
});

describe('getRestaurantCsv', () => {
  const csv = generate.getRestaurantCsv(1, 1);

  it('should be a string', () => {
    expect(typeof csv).toBe('string');
  });
});

describe('configArgs', () => {
  const processArgs = ['csv', 10, 'example'];
  const params = generate.configArgs(processArgs);

  it('should have file type as first argument', () => {
    expect(params[0]).toBe('csv');
  });

  it('should have number of entries as first argument', () => {
    expect(params[1]).toBe(10);
  });

  it('should have file name as third argument', () => {
    expect(params[2]).toBe('example');
  });

  it('should have chunk function as fourth argument', () => {
    expect(typeof params[3]).toBe('function');
  });
});