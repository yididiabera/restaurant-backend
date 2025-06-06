const IUserRepository = require("../../../domain/repositories/IUserRepository");
const UserModel = require("../models/User");

class UserRepository extends IUserRepository {
  async create(user) {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

module.exports = UserRepository;
