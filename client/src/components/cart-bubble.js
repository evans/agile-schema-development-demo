import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const GET_CART_ITEMS = gql`
  query CartBubble_GetCartItems {
    cartItems @client
  }
`;

export default function CartBubble() {
  return (
    <Query query={GET_CART_ITEMS}>
      {({ data, loading, error }) => {
        if (loading || error || data.cartItems.length === 0) return <div />;
        return (
          <div
            style={{
              position: "absolute",
              backgroundColor: "#e535ab",
              width: "20px",
              height: "20px",
              fontSize: "12px",
              color: "white",
              borderRadius: "10px",
              right: "-5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "sans-serif",
              letterSpacing: 0
            }}
          >
            {data.cartItems.length}
          </div>
        );
      }}
    </Query>
  );
}
