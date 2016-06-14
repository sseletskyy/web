import models from '../../models';

export const authenticate = async (
  user,
  badges = [],
  resolve = () => {},
  obj,
  args,
  context,
) => {
  // check if user is logged in
  if (!user || !user.sub) return false;
  if (badges.length > 0) {
    // get badges from user
    let mybadges = await models.BadgeRelationship.findAll({
      where: { type: 'user', ThingId: user.sub },
      include: [models.Badge],
    });
    mybadges = mybadges.map(({ Badge }) => Badge.uri);
    // loop over permissions and authenticate
    for (let i = 0; i < badges.length; i++) {
      if (mybadges.indexOf(badges[i]) === -1) {
        return false;
      }
    }
  }
  if (resolve) {
    await resolve(obj, args, context);
  }
  return true;
};
