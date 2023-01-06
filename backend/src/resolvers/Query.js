const Query = {
  players: async (parent, { filter }, { playerModel }) => {
    const players = await playerModel
      .find({
        name: { $regex: filter.name },
        lanes: {
          $in:
            filter.lanes.length === 0
              ? ["Top", "Jungle", "Middle", "Bottom", "Support"]
              : filter.lanes,
        },
        rank: {
          $in:
            filter.rank.length === 0
              ? ["鐵", "銅", "銀", "金", "白金", "鑽石", "大師", "宗師", "菁英"]
              : filter.rank,
        },
      })
      .sort();
    return players;
  },
  invitations: async (parent, args, { invitationModel }) => {
    const invitations = await invitationModel.find().sort();
    return invitations;
  },
};

export default Query;
