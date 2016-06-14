export default (sequelize, DataTypes) => {
  const Badge = sequelize.define('Badge', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID4,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ['@@type']: {
      type: DataTypes.VIRTUAL,
      get: function get() {
        return 'Badge';
      },
    },
  }, {
    classMethods: {
      associate: function associate(models) {
        Badge.hasMany(models.BadgeRelationship);
      },
    },
  });
  return Badge;
};
