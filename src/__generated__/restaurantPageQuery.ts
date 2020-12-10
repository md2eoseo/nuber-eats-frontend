/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantPageQuery
// ====================================================

export interface restaurantPageQuery_restaurant_restaurant_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface restaurantPageQuery_restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: restaurantPageQuery_restaurant_restaurant_category | null;
  isPromoted: boolean;
}

export interface restaurantPageQuery_restaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: restaurantPageQuery_restaurant_restaurant | null;
}

export interface restaurantPageQuery {
  restaurant: restaurantPageQuery_restaurant;
}

export interface restaurantPageQueryVariables {
  input: RestaurantInput;
}
