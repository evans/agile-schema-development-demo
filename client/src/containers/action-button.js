import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { GET_LAUNCH_DETAILS } from "../pages/launch";
import { GET_MY_TRIPS } from "../pages/profile";
import Button from "../components/button";
import { LAUNCH_TILE_DATA } from "../pages/launches";

// export all queries used in this file for testing
export { GET_LAUNCH_DETAILS };

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function ActionButton({ isBooked, id, isInCart }) {
  return (
    <Mutation
      mutation={isBooked ? CANCEL_TRIP : TOGGLE_CART}
      variables={{ launchId: id }}
      refetchQueries={[
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id }
        }
      ]}
      update={(cache, { data }) => {
        const result = cache.readQuery({ query: GET_MY_TRIPS });
        cache.writeQuery({
          query: GET_MY_TRIPS,
          data: {
            me: {
              ...result.me,
              trips: result.me.trips.filter(
                ({ id }) =>
                  !data.cancelTrip.launches.find(
                    ({ id: cancelledId }) => cancelledId === id
                  )
              )
            }
          }
        });
      }}
    >
      {(mutate, { loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>An error occurred</p>;

        return (
          <div>
            <Button
              onClick={mutate}
              isBooked={isBooked}
              data-testid={"action-button"}
            >
              {isBooked
                ? "Cancel This Trip"
                : isInCart
                ? "Remove from Cart"
                : "Add to Cart"}
            </Button>
          </div>
        );
      }}
    </Mutation>
  );
}
