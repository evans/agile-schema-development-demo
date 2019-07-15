import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Header, Loading } from "../components";
import { CartContents } from "../containers";

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default function Cart() {
  return (
    <Query query={GET_CART_ITEMS}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR: {error.message}</p>;
        return (
          <Fragment>
            <Header>My Cart</Header>
            <CartContents cartItems={data && data.cartItems} />
          </Fragment>
        );
      }}
    </Query>
  );
}
