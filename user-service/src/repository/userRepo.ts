import { User, UserModel, UserUpdateOptions } from '../models/user';

const createUser = async (user: User) => {
  const newUser = await UserModel.create(user);
  return newUser;
};

const updateUser = async (username: string, updatedUserFields: UserUpdateOptions) => {
  const updatedUser = await UserModel.findOneAndUpdate({ username }, updatedUserFields, {
    new: true,
  })
    .select('-__v -password')
    .lean();
  return updatedUser;
};

const getUser = async (username: string) => {
  const user = await UserModel.findOne({ username }).select('-__v').lean();
  return user;
};

const deleteUser = async (username: string) => {
  const deletedUser = await UserModel.deleteOne({ username }).select('-__v').lean();
  return deletedUser;
};

const UserRepo = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
};

export { UserRepo as default };
