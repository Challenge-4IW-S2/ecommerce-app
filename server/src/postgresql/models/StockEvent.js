'use strict';
import { Model, DataTypes } from "sequelize";
import {
  denormalizeStockEventCreate,
  denormalizeStockEventDelete,
  denormalizeStockEventUpdate
} from "../../denormalizations/stockEvent.js";
export default function (connection) {
  class StockEvent extends Model {
    static associate(models) {
      StockEvent.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  StockEvent.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: 'id',
      },
    },
    event_type: {
      type: DataTypes.ENUM( 'stock_in','stock_out'),
      allowNull: false,
    },
    stock_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize: connection,
    tableName: 'stock_event',
    underscored: true,
    timestamps: true
  });


  StockEvent.afterCreate(async (stockEvent) => {
    await denormalizeStockEventCreate(stockEvent);
  });

  StockEvent.beforeUpdate(async (stockEvent) => {
    await denormalizeStockEventUpdate(stockEvent);
  });

  StockEvent.afterDestroy(async (stockEvent) => {
    await denormalizeStockEventDelete(stockEvent);
  });

  return StockEvent;
};