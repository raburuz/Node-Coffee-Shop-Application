const { Schema, model } = require('mongoose');
const User = require('./user');

const categorySchema = Schema({
      name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
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
});

categorySchema.methods.toJSON = function () {
      const { __v, _id, ...category } = this.toObject();
      category.id = _id;
      return category;
};

module.exports = model('Category', categorySchema);
