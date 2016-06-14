import {
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import models from '../../models';
import { authenticate } from './authenticate';

import _ from 'lodash';

export function generateCursor(createdAt) {
  return new Date(createdAt).getTime() / 1000;
}

export function dumbEdges({
  edges = [],
  pageInfo,
  totalCount = 0,
}) {
  return {
    edges,
    pageInfo: pageInfo || {
      startCursor: _.get(edges[0], 'cursor'),
      endCursor: _.get(edges[edges.length - 1], 'cursor'),
      hasPreviousPage: false,
      hasNextPage: false,
    },
    totalCount,
  };
}

export function getEdge(edge, prop) {
  return ({
    type: edge,
    resolve: async ({ id }, args, { loaders }) => {
      const node = await loaders[prop].load(id);
      return {
        cursor: generateCursor(node.createdAt),
        node,
      };
    },
  });
}

export function resolveHelper({
  auth,
  badges,
  include = [],
  prop,
  resolveAuth,
  resolveNode,
  where,
}) {
  return async (obj, args, context) => {
    // authenticate middleware
    if (auth) {
      const isAuthenticated = await await authenticate(context.user, badges, resolveAuth, obj, args, context);
      if (!isAuthenticated) {
        return {
          edges: [],
          pageInfo: {
            startCursor: null,
            endCursor: null,
            hasPreviousPage: false,
            hasNextPage: false,
          },
          totalCount: 0,
        };
      }
    }

    const { before, after, first, last, status } = args;
    // set defaults

    // @FIXME Waiting on https://github.com/sequelize/sequelize/issues/222#issuecomment-221397386
    const limit = first || last || 0;
    let createdAt = { $gte: new Date('1970-01-01') };
    let order = [];

    // get where props
    let whereProps = {}; // pass args into where
    if (where) {
      whereProps = await where(obj, args, context);
    }

    let rows = [];
    if (limit > 0) {
      if (status !== 'best') {
        // set variables based on situation
        if (first) {
          if (after) {
            createdAt = { $lt: new Date(parseFloat(after, 10) * 1000) };
          }
          order = [['createdAt', 'DESC']];
          if (status === 'oldest') order = [['createdAt', 'ASC']];
        } else if (last) {
          if (before) {
            createdAt = { $gt: new Date(parseFloat(before, 10) * 1000) };
          }
          order = [['createdAt', 'ASC']];
          if (status === 'oldest') order = [['createdAt', 'DESC']];
        }
        // get the rows!
        rows = await models[prop].findAll({
          logging: console.log,
          where: {
            ...whereProps,
            createdAt,
          },
          include: [...include],
          order,
          limit: limit + 1,
          raw: true,
        });
      } else if (status === 'best') {
        const queryGenerator = models.sequelize.getQueryInterface().QueryGenerator;
        const [results] = await models.sequelize.query(`
          SELECT "${prop}".*, COUNT("Votes"."ThingId") AS "votes"
          FROM "${prop}s" AS "${prop}"
          LEFT OUTER JOIN "Votes" AS "Votes"
            ON "${prop}"."id" = "Votes"."ThingId" AND "Votes"."type" = '${prop.toLowerCase()}'
          WHERE (${queryGenerator.getWhereConditions({ ...whereProps, createdAt }, prop)})
          GROUP BY "${prop}"."id"
          ORDER BY "votes" DESC, "${prop}"."createdAt"
          DESC LIMIT ${limit};
        `);
        rows = results;
      }
    }

    // get total count
    const totalCount = await models[prop].count({
      where: {
        ...whereProps,
        createdAt,
      },
      order,
    });
    // generate the cursors
    let edges = rows.reduce((result, node, index) => {
      const cursor = generateCursor(node.createdAt);
      if (first && (index < limit)) {
        return [...result, { node, cursor }];
      }
      if (last && !(rows.length > limit && index === 0)) {
        return [{ node, cursor }, ...result];
      }
      return result;
    }, []);

    if (resolveNode) {
      edges = await Promise.all(edges.map(async (edge) => {
        const node = resolveNode(edge, args, context);
        return { ...edge, node };
      }));
    }
    return {
      edges,
      pageInfo: {
        startCursor: edges[0] && edges[0].cursor,
        endCursor: edges[edges.length - 1] && edges[edges.length - 1].cursor,
        hasPreviousPage: !!last ? (rows.length > limit) : false,
        hasNextPage: !!first ? (rows.length > limit) : false,
      },
      totalCount,
    };
  };
}

export function betterConnectionDefinitons({
  name,
  nodeType,
  connectionFields = {},
}) {
  return connectionDefinitions({
    name,
    nodeType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: (conn) => conn.totalCount,
        description: 'count of total number of objects in connection, ignoring pagination',
      },
      ...connectionFields,
    }),
  });
}

export function connectionHelper({
  auth,
  args,
  badges,
  include,
  prop,
  resolve,
  resolveAuth,
  resolveNode,
  type,
  where,
}) {
  return {
    type,
    args: {
      ...connectionArgs,
      status: {
        type: GraphQLString,
        defaultValue: 'newest',
        description: 'filter arg',
      },
      ...args,
    },
    resolve: resolve || resolveHelper({
      auth,
      badges,
      include,
      prop,
      resolveNode,
      resolveAuth,
      where,
    }),
  };
}
