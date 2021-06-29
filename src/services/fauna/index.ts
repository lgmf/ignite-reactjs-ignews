import { Client } from "faunadb";

export * from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
});
