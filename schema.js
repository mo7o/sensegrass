exports.typeDefs = `
 
type Land {
    _id: ID
    lat: [Float]
    lng: [Float]
    username: String
    polygonArea: Float
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!  
}

type Query { 
    getCurrentUser: User
    getUserLand(username: String): Land
}

type Token {
    token: String!
}

type Mutation { 

    signupUser(username: String!, email: String!, password: String!): Token

    signinUser(username: String!, password: String!): Token

    addLand(lat: [Float], lng: [Float], username: String, polygonArea: Float): Land

    updateUserLand(_id: ID!, lat: [Float], lng: [Float], polygonArea: Float): Land

}

`;
