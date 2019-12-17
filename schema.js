exports.typeDefs = `
type Land {
    _id: ID
    user: User! 
    city: String!
    state: String!
    zipcode: String!
    country: String!
    lat: String
    lng: String 
    area: String!
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
    addLand(user: String!, city: String!, state: String!, zipcode: String!, country: String, lat: String!, lng: String!, area: String!): Land

    signupUser(username: String!, email: String!, password: String!): Token

    signinUser(username: String!, password: String!): Token
}


`;
