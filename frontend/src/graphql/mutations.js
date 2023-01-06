import { gql } from "@apollo/client";

// TODO 3.1 Mutation - Update item

export const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      id
      name
      lanes
      heros
      rank
      facebook
    }
  }
`;

export const UPDATE_PLAYER_MUTATION = gql`
  mutation UpdatePlayer($input: UpdatePlayerInput!) {
    updatePlayer(input: $input) {
      id
      name
      lanes
      heros
      rank
      facebook
    }
  }
`;

export const CREATE_INVITATION_MUTATION = gql`
  mutation createInvitation($input: CreateInvitationInput!) {
    createInvitation(input: $input) {
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

export const UPDATE_INVITATION_MUTATION = gql`
  mutation updateInvitation($input: UpdateInvitationInput!) {
    updateInvitation(input: $input) {
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
