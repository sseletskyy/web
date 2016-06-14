export default (sequelize, DataTypes) => {
  const BadgeRelationship = sequelize.define('BadgeRelationship', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID4,
      allowNull: false,
    },
    ThingId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ['@@type']: {
      type: DataTypes.VIRTUAL,
      get: function get() {
        return 'BadgeRelationship';
      },
    },
  }, {
    classMethods: {
      associate: function associate(models) {
        BadgeRelationship.belongsTo(models.Badge, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return BadgeRelationship;
};
