const createUser = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    date_birth:"required|string",
    telephone:"required|string",
    country:"required|string",
    password: "required|string|minLength:3"
  };
  
  module.exports = {
    createUser
  };
  