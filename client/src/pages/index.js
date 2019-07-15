import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Launch from "./launch";
import Launches from "./launches";
import Cart from "./cart";
import { Footer, PageContainer } from "../components";
import BookedTrips from "./bookedTrips";

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
        </Router>
      </PageContainer>
      <BookedTrips />
      <Footer />
    </Fragment>
  );
}
