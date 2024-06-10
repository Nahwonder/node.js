import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  createUser(user) {
    user.email = user.email.toLowerCase();

    if (
      this.search({ email: user.email }) ||
      this.search({ phoneNumber: user.phoneNumber })
    ) {
      return null;
    }

    return userRepository.create(user);
  }
  getUserById(id) {
    const user = this.search({ id });

    if (!user) {
      return null;
    }
    return user;
  }

  getUsers() {
    return userRepository.getAll();
  }

  updateUser(id, data) {
    if (!this.search({ id })) {
      return null;
    }

    if (data.email) {
      data.email = data.email.toLowerCase();
      if (this.search({ email: data.email })) {
        return null;
      }
    }

    if (data.phoneNumber && this.search({ phoneNumber: data.phoneNumber })) {
      return null;
    }
    return userRepository.update(id, data);
  }

  deleteUser(id) {
    if (!this.search({ id })) {
      return null;
    }

    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
