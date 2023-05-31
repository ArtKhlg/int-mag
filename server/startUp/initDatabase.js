const Category = require("../models/Category");
const Product = require("../models/Product");
const categoryMock = require("../mock/categories.json");
const productMock = require("../mock/products.json");

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoryMock.length) {
    await createInitialEntity(Category, categoryMock);
  }
};

module.exports = async () => {
  const products = await Product.find();
  if (products.length !== productMock.length) {
    await createInitialEntity(Product, productMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
