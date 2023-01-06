import { gql } from "@apollo/client";

export const PLAYER_CREATED_SUBSCRIPTION = gql`
  subscription PlayerCreated {
    playerCreated {
      id
      name
      lanes
      heros
      rank
      facebook
    }
  }
`;

export const PLAYER_UPDATED_SUBSCRIPTION = gql`
  subscription PlayerUpdated {
    playerUpdated {
      id
      name
      lanes
      heros
      rank
      facebook
    }
  }
`;

export const INVITATION_CREATED_SUBSCRIPTION = gql`
  subscription InvitationCreated {
    invitationCreated {
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

export const INVITATION_UPDATED_SUBSCRIPTION = gql`
  subscription InvitationUpdated {
    invitationUpdated {
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
