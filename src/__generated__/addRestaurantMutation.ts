/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addRestaurantMutation
// ====================================================

export interface addRestaurantMutation_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  restaurantId: number;
  error: string | null;
}

export interface addRestaurantMutation {
  createRestaurant: addRestaurantMutation_createRestaurant;
}

export interface addRestaurantMutationVariables {
  input: CreateRestaurantInput;
}
