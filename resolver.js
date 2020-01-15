const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getUserLand: async (root, { username }, { Land }) => {
      const userLand = await Land.findOne({ username });
      return userLand;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) return null;

      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "lands",
        model: "Land"
      });

      return user;
    }
  },

  Mutation: {
    addLand: async (root, { username, lat, lng, polygonArea }, { Land }) => {
      const newLand = await new Land({
        username,
        lat,
        lng,
        polygonArea
      }).save();
      return newLand;
    },

    updateUserLand: async (root, { _id, lat, lng, polygonArea }, { Land }) => {
      const updatedLand = await Land.findOneAndUpdate(
        { _id },
        { $set: { lat, lng, polygonArea } },
        { new: true }
      );
      return updatedLand;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username: username });
      if (user) throw new Error("User already exist");

      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "24hr") };
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username: username });
      if (!user) throw new Error("User not found");

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error("Invalid Password");

      return { token: createToken(user, process.env.SECRET, "24hr") };
    }
  }
};
