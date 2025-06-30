import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import request from 'supertest';

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: false,
  })
);

describe('GraphQL API Integration Tests', () => {
  it('should return a zip code for a valid zip query', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({ query: '{ getZipByCode(zip: "90210") { city } }' });

    expect(response.status).toBe(200);
    expect(response.body.data.getZipByCode.city).toBe('Beverly Hills');
  });

  it('should return a list of zip codes for a valid state query', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({ query: '{ getZipsByState(state_name: "California") { zip } }' });

    expect(response.status).toBe(200);
    expect(response.body.data.getZipsByState).toBeInstanceOf(Array);
    expect(response.body.data.getZipsByState.length).toBeGreaterThan(0);
  });
});
