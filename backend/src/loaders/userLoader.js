import DataLoader from 'dataloader';
import logger from '../utils/logger';
import { management } from '../vendor/auth0';

async function getUserFromAuth0(id, sub) {
  try {
    // return full user if userid === sub, else just return name and username
    const user = await management.getUser({ id });
    // clean up
    user['@@type'] = 'User';
    user.id = user.user_id;
    return user;
  } catch (err) {
    logger.error('Error trying to fetch user from auth0');
    throw err;
  }
}

function userLoader(sub) {
  return new DataLoader(
    ids => Promise.all(ids.map((id) => getUserFromAuth0(id, sub)))
  );
}

export default userLoader;
