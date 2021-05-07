import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    // TODO: Add login with next-auth.js & Github
    Authorization: `Bearer ${process.env.GITHUB_PAT}`,
  },
});

const getAkashApps = gql`
  query RepoFiles {
    repository(owner: "ovrclk", name: "awesome-akash") {
      object(expression: "HEAD:") {
        # Top-level.
        ... on Tree {
          repoEntries: entries {
            name
            type
            children: object {
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Blob {
                      byteSize
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default async function (_: NextApiRequest, res: NextApiResponse) {
  const result = await client.query({
    query: getAkashApps,
  });
  if (result.error || result.errors) {
    res.status(500).json(result.errors);
  } else {
    res.status(200).json(result.data);
  }
  res.end();
}
