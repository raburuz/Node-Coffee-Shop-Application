const { Schema, model } = require('mongoose');
const Category = require('./category');
const User = require('./user');

const productSchema = Schema({
      name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
      },
      price: {
            type: Number,
            default: 0,
      },
      condition: {
            type: Boolean,
            default: true,
            required: [true, 'Condition is required'],
      },
      user: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: [true, 'User Reference is required'],
      },
      category: {
            type: Schema.Types.ObjectId,
            ref: Category,
            required: [true, 'User Reference is required'],
      },
      description: {
            type: String,
            default: '',
      },
      available: {
            type: Boolean,
            default: true,
      },
});

productSchema.methods.toJSON = function () {
      const { __v, _id, ...product } = this.toObject();
      product.id = _id;
      product.user.uid = product.user._id;
      product.category.uid = product.category._id;
      delete product.category._id;
      delete product.user._id;
      return product;
};

module.exports = model('Product', productSchema);
