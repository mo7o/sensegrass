const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllLands: async (root, args, { Land }) => {
      const allLands = await Land.find();
      return allLands;
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) return null;

      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Land"
      });

      return user;
    }
  },

  Mutation: {
    addLand: async (
      root,
      { name, description, category, instructions, username },
      { Land }
    ) => {
      const newLand = await new Land({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newLand;
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
