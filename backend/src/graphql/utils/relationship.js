import models from '../../models';

export const checkIfMentee = async (toId, fromId, t) => {
  if (!toId || !fromId) return new Error('toId and fromId required');
  if (toId === fromId) return true;
  const mustBeOne = await models.Relationship.count({
    where: {
      toId,
      fromId,
      status: 'accepted',
    },
    transaction: t,
  });
  return mustBeOne === 1;
};
