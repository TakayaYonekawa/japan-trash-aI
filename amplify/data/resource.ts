import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Define and configure the data resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/data
 */
const schema = a.schema({
  UserProfile: a.model({
    pref: a.string(),
    city: a.string(),
    ward: a.string(),
  }).authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
