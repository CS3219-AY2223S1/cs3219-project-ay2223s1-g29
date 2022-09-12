import { User, UserModel, UserUpdateOptions } from '../models/user';

const register = async (user: User) => {
  const newUser = await UserModel.create(user);
  return newUser;
};

const updateUser = async (userId: string, updatedUserFields: UserUpdateOptions) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserFields, {
    new: true,
  })
    .select('-__v')
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
  register,
  updateUser,
  getUser,
  deleteUser,
};

export { UserRepo as default };
