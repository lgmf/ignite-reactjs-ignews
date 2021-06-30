import { Client } from "faunadb";

export * from "faunadb";
export { query as q } from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
});
