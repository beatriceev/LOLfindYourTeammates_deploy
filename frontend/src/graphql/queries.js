import { gql } from "@apollo/client";

export const GET_PLAYERS_QUERY = gql`
  query GET_PLAYERS_QUERY($filter: Filter!) {
    players(filter: $filter) {
      id
      name
      lanes
      heros
      rank
      facebook
    }
  }
`;

export const GET_INVITATIONS_QUERY = gql`
  query invitations {
    invitations {
      _id
      sender
      to
      date
      time
      message
      read
      ok
    }
  }
`;
