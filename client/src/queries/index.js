import { gql } from "apollo-boost";

// Lands queries
export const GET_ALL_LANDS = gql`
  query {
    getAllLands {
      name
      description
      instructions
      category
      likes
      createdDate
    }
  }
`;

// Lands Mutations
// User Queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      joinDate
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
