import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

const types = new Map;

export function registerNodeFetcher(type) {
  if (types.has(type)) {
    throw new Error(`Type fetcher for type "${type}" has already been registered.`);
  }
  const name = type.name;
  types.set(name, type);
}

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, { loaders, user }) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Viewer' && (user && user.sub)) return { id: 0, '@@type': 'Viewer' };
    if (type === 'Public') return { id: 0, '@@type': 'Public' };
    return loaders[type] ? loaders[type].load(id) : null;
  },
  (obj) => types.get(obj['@@type']),
);

export { nodeInterface, nodeField, types };
