/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantQuery
// ====================================================

export interface searchRestaurantQuery_searchRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantQuery_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: searchRestaurantQuery_searchRestaurant_restaurants_category | null;
  isPromoted: boolean;
}

export interface searchRestaurantQuery_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurantQuery_searchRestaurant_restaurants[] | null;
}

export interface searchRestaurantQuery {
  searchRestaurant: searchRestaurantQuery_searchRestaurant;
}

export interface searchRestaurantQueryVariables {
  input: SearchRestaurantInput;
}
