import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    _uid: { type: String, required: true, unique: true },
    _data: {
      fullName: String,
      emailAddress: String,
      phoneNumber: String,
      photoURL: String,
      dateOfBirth: String,
      age: String,
      gender: String,
      address: String,
      isVerified: {
        phoneNumber: Boolean,
        emailAddress: Boolean,
      },
    },
  },
  { timestamps: true },
);

interface IUserProfileDocument extends mongoose.Document {
  _uid: string;
  _data: {
    fullName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    photoURL?: string;
    dateOfBirth?: string;
    age?: string;
    gender?: string;
    address?: string;
    isVerified?: {
      phoneNumber?: boolean;
      emailAddress?: boolean;
    };
  };
}

interface IUserProfileModel extends mongoose.Model<IUserProfileDocument> {}

const userProfileDB =
  mongoose.models.user_profile ||
  mongoose.model<IUserProfileDocument, IUserProfileModel>(
    'user_profile',
    userProfileSchema,
  );

export default userProfileDB;
