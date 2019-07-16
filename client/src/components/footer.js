import React from "react";
import styled from "react-emotion";

import MenuItem from "./menu-item";
import CartBubble from "./cart-bubble";
import LogoutButton from "../containers/logout-button";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { colors, unit } from "../styles";

export default function Footer() {
  return (
    <Container>
      <InnerContainer>
        <MenuItem to="/">
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem to="/cart">
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              width: "60px"
            }}
          >
            <CartBubble />
            <CartIcon />
          </div>
          Cart
        </MenuItem>
        <LogoutButton />
      </InnerContainer>
    </Container>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled("footer")({
  flexShrink: 0,
  marginTop: "auto",
  backgroundColor: "white",
  color: colors.textSecondary,
  position: "sticky",
  bottom: 0
});

const InnerContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  maxWidth: 460,
  padding: unit * 2.5,
  margin: "0 auto"
});
