const Subscription = {
  playerCreated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("PLAYER_CREATED");
    },
  },

  playerUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("PLAYER_UPDATED");
    },
  },

  invitationCreated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("INVITATION_CREATED");
    },
  },

  invitationUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("INVITATION_UPDATED");
    },
  },
};

export default Subscription;
