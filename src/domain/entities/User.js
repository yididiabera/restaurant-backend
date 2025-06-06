class User {
  constructor({ name, email, password, role = "customer" }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
  }
}

module.exports = User;
