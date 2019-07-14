import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from "../components/button";
import { GET_LAUNCH } from "./cart-item";

export { GET_LAUNCH };
export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds)
  }
`;

export default function BookTrips({ cartItems }) {
  return (
    <Mutation
      mutation={BOOK_TRIPS}
      variables={{ launchIds: cartItems }}
      refetchQueries={cartItems.map(launchId => ({
        query: GET_LAUNCH,
        variables: { launchId }
      }))}
      update={cache => {
        cache.writeData({ data: { cartItems: [] } });
      }}
    >
      {(bookTrips, { data }) =>
        data && data.bookTrips ? (
          <p data-testid="message">Failed to book</p>
        ) : (
          <Button onClick={bookTrips} data-testid="book-button">
            Book All
          </Button>
        )
      }
    </Mutation>
  );
}
