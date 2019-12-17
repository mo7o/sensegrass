exports.typeDefs = `
type Land {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Land]
}

type Query {
    getAllLands: [Land]
 
    getCurrentUser: User
}

type Token {
    token: String!
}

type Mutation {
    addLand(name: String!, description: String!, category: String!, instructions: String!, username: String): Land

    signupUser(username: String!, email: String!, password: String!): Token

    signinUser(username: String!, password: String!): Token
}


`;
