// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// DONE: Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// DONE: Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

// DONE: Products belongToMany Tags (through ProductTag)
// * Check that this syntax actually works
Product.belongsToMany(Tag, {
  through: ProductTag
})


// DONE: Tags belongToMany Products (through ProductTag)
// * Check that this syntax actually works
Tag.belongsToMany(Product, {
  through: ProductTag
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
