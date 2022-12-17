const CreateToken = user => {
  return  {userId: user._id, username: user.firstName + " " + user.lastName, role: user.role, email: user.email};
}

module.exports = CreateToken;