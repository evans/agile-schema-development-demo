import styled from "react-emotion";
import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Loading } from "../components";
import { LAUNCH_TILE_DATA } from "./launches";
import { unit } from "../styles";
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

export default function BookedMissions() {
  return (
    <Sidebar>
      <div>Booked Missions</div>
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
                data.me.trips.map(({ id, mission }) => (
                  <div>
                    <p>
                      <Link to={`/launch/${id}`}>{mission.name}</Link>
                    </p>
                  </div>
                ))
              ) : (
                <p>You haven't booked any trips</p>
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
  top: unit * 4,
  right: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: 1
});
