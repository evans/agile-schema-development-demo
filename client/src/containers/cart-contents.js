import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from "../components/button";
import BookSuccess from "../components/book-success";
import { CartItem } from ".";
import { GET_MY_TRIPS } from "../pages/bookedTrips";
import { LAUNCH_TILE_DATA } from "../pages/launches";

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTripsWithResponse(launchIds: $launchIds) {
      success
      launches {
        ...LaunchTile
      }
    }
  }

  ${LAUNCH_TILE_DATA}
`;

export default function CartContents({ cartItems }) {
  return (
    <Mutation
      mutation={BOOK_TRIPS}
      variables={{ launchIds: cartItems }}
      update={(
        cache,
        {
          data: {
            bookTripsWithResponse: { launches }
          }
        }
      ) => {
        cache.writeData({ data: { cartItems: [] } });

        const trips = cache.readQuery({ query: GET_MY_TRIPS });
        cache.writeQuery({
          query: GET_MY_TRIPS,
          data: {
            me: {
              ...trips.me,
              trips: [...trips.me.trips, ...launches]
            }
          }
        });
      }}
    >
      {(bookTrips, { data }) => {
        if (!cartItems || (!cartItems.length && !data)) {
          return <p>No items in your cart</p>;
        } else if (data && data.bookTripsWithResponse) {
          return <BookSuccess />;
        } else if (
          data &&
          !data.bookTripsWithResponse &&
          !data.bookTripsWithResponse.success
        ) {
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
