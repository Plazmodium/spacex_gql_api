import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import context from './context';
import { getDB } from './context/db';

(async () => {
  const port = process.env.PORT || 4000;
  const app = express();

  const db = await getDB();
  const ctx = { ...context, db };

  const graphql = new ApolloServer({
    schema,
    context: ctx,
    engine: {
      apiKey: process.env.ENGINE_API_KEY,
    },
    playground: true,
    introspection: true,
  });

  graphql.applyMiddleware({
    app,
  });

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`🚀  Server ready http://localhost:${port}`);
  });
})();
