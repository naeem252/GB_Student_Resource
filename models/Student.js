const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is requird'],
      unique: [true, 'Email is already exit please try another..'],
      validate: {
        validator: (val) => {
          return validator.isEmail(val);
        },
        message: 'email is not valid',
      },
    },
    department: {
      type: String,
      required: [true, 'Department is requird'],
    },
    semester: {
      type: Number,
      required: [true, 'Semester is required'],
    },
    classRoll: {
      type: Number,
      required: [true, 'Class roll is required'],
    },
    batch: {
      type: Number,
      required: [true, 'Batch is required'],
    },
    CR: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: 'default-avatar.jpg',
    },
    password: {
      type: String,
      required: [true, 'Password is requird'],
      minlength: [8, 'Password must be morethan or equal to 8 character'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Password confrim is requird'],
      minlength: [8, 'Password confirm must be morethan or equal to 8 character'],

      validate: {
        validator: (val) => {
          return val !== this.password;
        },
        message: 'Password are not match',
      },
    },
    mobile: {
      type: Number,
      minlength: [11, 'number is invalid'],
      maxlength: [11, 'number is invalid'],
    },
    passwordChangedAt: Date,
    passResetToken: String,
    passResetTokenExp: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

studentSchema.index({ email: 1 }, { unique: true });

/*
==========
VIRTUAL PROPERTY FOR STUDENT UPLOAD RESOURCES
==========
*/

studentSchema.virtual('resources', {
  ref: 'Resources',
  foreignField: 'student',
  localField: '_id',
});

/*
==========
UNSELECT PASSWORD
==========
*/
studentSchema.post(/^find/, function () {
  this.select('-password -__v');
});

// /*
// ==========
// EXCLUDE PASSWORD BY FIND By Id
// ==========
// */
// studentSchema.pre(/^findOne/, function (next) {
//   this.select('-password -__v');
//   next();
// });

/*
==========
incript password before save
==========
*/
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

/*
==========
check login password is correct
==========
*/
studentSchema.methods.isPasswordCorrect = async function (candidatePass, password) {
  return await bcrypt.compare(candidatePass, password);
};

/*
==========
JWT TOKEN ISSUE AFTER PASSWORD CHANGED
==========
*/
studentSchema.methods.passwordChangedAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changedTimestamp > JWTTimeStamp;
  }
  return false;
};

studentSchema.methods.createPassResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passResetTokenExp = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model('Student', studentSchema);
