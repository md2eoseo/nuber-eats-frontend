import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Restaurant } from "../../components/restaurant";
import {
  searchRestaurantQuery,
  searchRestaurantQueryVariables,
} from "../../__generated__/searchRestaurantQuery";

const SEARCH_RESTAURANT_QUERY = gql`
  query searchRestaurantQuery($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        address
        category {
          name
        }
        isPromoted
      }
    }
  }
`;
export const Search = () => {
  const [page, setPage] = useState(1);
  const term = window.location.href.split("term=")[1];
  const { data, loading } = useQuery<
    searchRestaurantQuery,
    searchRestaurantQueryVariables
  >(SEARCH_RESTAURANT_QUERY, {
    variables: {
      input: {
        page,
        query: term,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <Helmet>
        <title>Search '{term}' | Nuber Eats</title>
      </Helmet>
      <h1>
        Search : {term} ({data?.searchRestaurant.totalResults} results)
      </h1>
      <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 px-8 md:px-12">
        {data?.searchRestaurant.restaurants?.map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id + ""}
            coverImg={restaurant.coverImg}
            name={restaurant.name}
            categoryName={restaurant.category?.name}
          />
        ))}
      </div>
      {/* TODO: maybe i can make into infinite scroll. */}
      <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
        {page > 1 ? (
          <button
            onClick={onPrevPageClick}
            className="focus:outline-none font-medium text-2xl"
          >
            &larr;
          </button>
        ) : (
          <div></div>
        )}
        <span>
          Page {page} of {data?.searchRestaurant.totalPages}
        </span>
        {page !== data?.searchRestaurant.totalPages ? (
          <button
            onClick={onNextPageClick}
            className="focus:outline-none font-medium text-2xl"
          >
            &rarr;
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
