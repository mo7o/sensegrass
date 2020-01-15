import { gql } from "apollo-boost";

// Lands queries
export const GET_USER_LAND = gql`
  query($username: String) {
    getUserLand(username: $username) {
      _id
      username
      lat
      lng
      polygonArea
    }
  }
`;

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

export const UPDATE_USER_LAND = gql`
  mutation($_id: ID!, $lat: [Float], $lng: [Float], $polygonArea: Float) {
    updateUserLand(_id: $_id, lat: $lat, lng: $lng, polygonArea: $polygonArea) {
      _id
      lat
      lng
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
