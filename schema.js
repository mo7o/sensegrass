exports.typeDefs = `

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String! 
    lands: String
}

type Query { 
    getCurrentUser: User
}

type Token {
    token: String!
}

type Mutation { 

    signupUser(username: String!, email: String!, password: String!): Token

    signinUser(username: String!, password: String!): Token
}

`;
