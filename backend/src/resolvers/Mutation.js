const Mutation = {
  createPlayer: async (parent, { input }, { playerModel, pubSub }) => {
    const newPlayer = new playerModel(input);
    await newPlayer.save();
    pubSub.publish("PLAYER_CREATED", {
      playerCreated: newPlayer,
    });
    return newPlayer;
  },

  updatePlayer: async (parent, { input }, { playerModel, pubSub }) => {
    const player = await playerModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          name: input.name,
          lanes: input.lanes,
          heros: input.heros,
          rank: input.rank,
          facebook: input.facebook,
        },
      }
    );
    const newPlayer = {
      id: input.id ?? item.id,
      name: input.name ?? player.name,
      lanes: input.lanes ?? player.lanes,
      heros: input.heros ?? player.lane,
      rank: input.rank ?? player.lane,
      facebook: input.facebook ?? player.facebook,
    };
    pubSub.publish("PLAYER_UPDATED", {
      playerUpdated: newPlayer,
    });
    return newPlayer;
  },
  createInvitation: async (parent, { input }, { invitationModel, pubSub }) => {
    const newInvitation = new invitationModel({ ...input, read: false });
    await newInvitation.save();
    pubSub.publish("INVITATION_CREATED", {
      invitationCreated: newInvitation,
    });
    return newInvitation;
  },

  updateInvitation: async (parent, { input }, { invitationModel, pubSub }) => {
    const invitation = await invitationModel.findOneAndUpdate(
      { _id: input._id },
      {
        $set: {
          read: true,
          ok: input.ok,
        },
      }
    );
    const newInvitation = {
      sender: invitation.sender,
      to: invitation.to,
      date: invitation.date,
      time: invitation.time,
      message: invitation.message,
      read: true,
      ok: input.ok,
    };
    pubSub.publish("INVITATION_UPDATED", {
      invitationUpdated: newInvitation,
    });
    return newInvitation;
  },
};

export default Mutation;
