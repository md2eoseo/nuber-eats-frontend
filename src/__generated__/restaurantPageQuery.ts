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

export interface restaurantPageQuery_restaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface restaurantPageQuery_restaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: restaurantPageQuery_restaurant_restaurant_menu_options_choices[] | null;
}

export interface restaurantPageQuery_restaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: restaurantPageQuery_restaurant_restaurant_menu_options[] | null;
}

export interface restaurantPageQuery_restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  category: restaurantPageQuery_restaurant_restaurant_category | null;
  isPromoted: boolean;
  menu: restaurantPageQuery_restaurant_restaurant_menu[] | null;
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
