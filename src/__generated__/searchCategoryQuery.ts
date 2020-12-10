/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchCategoryQuery
// ====================================================

export interface searchCategoryQuery_category_category_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchCategoryQuery_category_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: searchCategoryQuery_category_category_restaurants_category | null;
  isPromoted: boolean;
}

export interface searchCategoryQuery_category_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
  restaurants: searchCategoryQuery_category_category_restaurants[] | null;
}

export interface searchCategoryQuery_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  category: searchCategoryQuery_category_category | null;
}

export interface searchCategoryQuery {
  category: searchCategoryQuery_category;
}

export interface searchCategoryQueryVariables {
  input: CategoryInput;
}
