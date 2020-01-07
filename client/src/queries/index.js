import { gql } from "apollo-boost";

// Lands queries
// export const GET_ALL_LANDS = gql`
//   query {
//     getAllLands {
//       _id
//       user
//       location
//     }
//   }
// `;

// Lands Mutations

export const ADD_LAND = gql`
  mutation(
    $lat: [Float]
    $lng: [Float]
    $username: String
    $polygonArea: Float
  ) {
    addLand(
      lat: $lat
      lng: $lng
      username: $username
      polygonArea: $polygonArea
    ) {
      lat
      lng
      username
      polygonArea
    }
  }
`;

// User Queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
    }
  }
`;

// User Mutations

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
