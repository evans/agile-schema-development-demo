import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from "../components/button";
import BookSuccess from "../components/book-success";
import { CartItem } from ".";
import { GET_MY_TRIPS } from "../pages/bookedTrips";

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds)
  }
`;

export default function CartContents({ cartItems }) {
  return (
    <Mutation
      mutation={BOOK_TRIPS}
      variables={{ launchIds: cartItems }}
      refetchQueries={cartItems.map(launchId => ({
        query: GET_MY_TRIPS,
        variables: { launchId }
      }))}
      update={cache => {
        cache.writeData({ data: { cartItems: [] } });
      }}
    >
      {(bookTrips, { data }) => {
        if (!cartItems || (!cartItems.length && !data)) {
          return <p>No items in your cart</p>;
        } else if (data && data.bookTrips) {
          return <BookSuccess />;
        } else if (data && !data.bookTrips) {
          return <p>Failed to book</p>;
        }

        return (
          <Fragment>
            {cartItems.map(launchId => (
              <CartItem key={launchId} launchId={launchId} />
            ))}
            <Button onClick={bookTrips} data-testid="book-button">
              Book All
            </Button>
          </Fragment>
        );
      }}
    </Mutation>
  );
}
