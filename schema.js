exports.typeDefs = `
type Land {
    _id: ID
    user: String!
    location: String! 
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    lands: [Land]
}

type Query {
    getAllLands: [Land]
 
    getCurrentUser: User
}

type Token {
    token: String!
}

type Mutation {
    addLand(location: String!, user: String!): Land

    signupUser(username: String!, email: String!, password: String!): Token

    signinUser(username: String!, password: String!): Token
}


`;
