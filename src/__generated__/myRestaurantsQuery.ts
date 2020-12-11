/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myRestaurantsQuery
// ====================================================

export interface myRestaurantsQuery_myRestaurants_results_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface myRestaurantsQuery_myRestaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: myRestaurantsQuery_myRestaurants_results_category | null;
  isPromoted: boolean;
}

export interface myRestaurantsQuery_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  results: myRestaurantsQuery_myRestaurants_results[] | null;
}

export interface myRestaurantsQuery {
  myRestaurants: myRestaurantsQuery_myRestaurants;
}
