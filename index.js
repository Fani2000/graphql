import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import products from "./products/products.model.js";
import orders from "./orders/orders.model.js";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles, loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import productsResolvers from "./products/products.resolvers.js";
import ordersResolvers from "./orders/orders.resolvers.js";

const files = path.join("**/*.graphql");

const typesArray = loadFilesSync(files);
const typesResolvers = [productsResolvers, ordersResolvers];

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: typesResolvers,
});

const root = {
  products,
  orders,
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");

// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

// const typeDefs = `#graphql
//   type Book {
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book]
//   }

//   type Mutations: {
//     addBook(title,author)
//   }
// `;

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
//   Mutations: {
//     addBook(title, author) {
//       books.push({ title, author });
//     },
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);
