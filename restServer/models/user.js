/* 
Example User Model:Schema

      {
            name: string,
            email:string,
            password:string,
            img:string,
            role:string,
            condition: boolean,
            google:boolean,
      }

*/

const { Schema, model } = require('mongoose');

const UserSchema = Schema({
      name: {
            type: String,
            required: [true, 'Name is required'],
      },
      email: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'Email is required'],
            unique: true,
      },
      password: {
            type: String,
            required: [true, 'Password is required'],
      },
      img: {
            type: String,
      },
      role: {
            type: String,
            required: [true, 'Role is required'],
      },
      condition: {
            type: Boolean,
            default: true,
      },
      google: {
            type: Boolean,
            default: false,
      },
});

/* Delete from response password and __v*/
UserSchema.methods.toJSON = function () {
      const { password, __v, _id, ...user } = this.toObject();
      user.uid = _id;
      return user;
};

module.exports = model('User', UserSchema);
