import styled, { keyframes } from "react-emotion";
import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Loading } from "../components";
import { LAUNCH_TILE_DATA } from "./launches";
import { Link } from "@reach/router";

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function BookedTrips() {
  return (
    <Sidebar>
      <StyledHeader>Booked Trips</StyledHeader>
      <Query
        query={GET_MY_TRIPS}
        partialRefetch={true}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <p>ERROR: {error.message}</p>;

          return (
            <Fragment>
              {data.me && data.me.trips.length ? (
                data.me.trips.map(({ id, mission, rocket }) => (
                  <BookedTrip id={id} mission={mission} rocket={rocket} />
                ))
              ) : (
                <StyledEmpty>You haven't booked any trips yet. :(</StyledEmpty>
              )}
            </Fragment>
          );
        }}
      </Query>
    </Sidebar>
  );
}

const Sidebar = styled("div")({
  position: "fixed",
  margin: "32px",
  right: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flexGrow: 1,
  width: "240px"
});

const slideIn = keyframes`
to {
  transform: translate3d(0,0,0);
}

from {
  transform: translate3d(100px,0,0);
  opacity: 0;
}
`;

const StyledLink = styled(Link)({
  fontFamily: "monospace",
  color: "#343c5a",
  textDecoration: "none",
  backgroundColor: "white",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  borderRadius: "4px",
  height: "40px",
  width: "240px",
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  marginBottom: "16px",
  animation: `${slideIn} 400ms ease-in-out`
});

const StyledArrow = styled("div")({
  color: "#2075D6",
  paddingLeft: "7px",
  paddingRight: "7px"
});

const StyledMission = styled("div")({
  flex: "1",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  paddingLeft: "16px"
});

const BookedTrip = ({ id, mission, rocket }) => (
  <StyledLink to={`/launch/${id}`}>
    <StyledMission>
      {mission.name} on {rocket.name}
    </StyledMission>
    <StyledArrow>→</StyledArrow>
  </StyledLink>
);

const StyledHeader = styled("div")({
  padding: "16px",
  fontSize: "13px",
  fontWeight: "600"
});

const StyledEmpty = styled("div")({
  paddingLeft: "16px",
  fontSize: "13px"
});
