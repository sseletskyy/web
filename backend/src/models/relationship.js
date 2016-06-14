export default (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    toId: { // Auth0 relationship
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromId: { // Auth0 relationship
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      /* Values:
       * pending
       * accepted
       * denied
       */
    },
    ['@@type']: {
      type: DataTypes.VIRTUAL,
      get: function get() {
        return 'Relationship';
      },
    },
  }, {
    paranoid: true,
    classMethods: {
    },
  });
  return Relationship;
};
