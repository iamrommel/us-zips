import { resolvers } from './resolvers';

// Mock the readCsv function
jest.mock('./resolvers', () => {
  const originalModule = jest.requireActual('./resolvers');
  const mockData = [
    { zip: '12345', state_name: 'Test State', city: 'Test City' },
    { zip: '54321', state_name: 'Test State', city: 'Another City' },
  ];
  return {
    ...originalModule,
    readCsv: jest.fn(() => Promise.resolve(mockData)),
  };
});

describe('GraphQL Resolvers', () => {
  describe('getZipByCode', () => {
    it('should return a zip code for a valid zip', async () => {
      const result = await resolvers.getZipByCode({ zip: '12345' });
      expect(result).toBeDefined();
      expect(result?.zip).toBe('12345');
    });

    it('should return undefined for an invalid zip', async () => {
      const result = await resolvers.getZipByCode({ zip: '00000' });
      expect(result).toBeUndefined();
    });
  });

  describe('getZipsByState', () => {
    it('should return an array of zip codes for a valid state', async () => {
      const result = await resolvers.getZipsByState({ state_name: 'Test State' });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(2);
      expect(result[0].state_name).toBe('Test State');
    });

    it('should return an empty array for a state with no zip codes', async () => {
      const result = await resolvers.getZipsByState({ state_name: 'Empty State' });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(0);
    });
  });
});
