import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type ZipCode {
    zip: String!
    lat: Float!
    lng: Float!
    city: String!
    state_id: String!
    state_name: String!
    population: Int
    density: Float
    county_name: String
    timezone: String
  }

  type Query {
    getZipByCode(zip: String!): ZipCode
    getZipsByState(state_name: String!): [ZipCode]
  }
`);
