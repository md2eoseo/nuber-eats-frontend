import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Category } from "../../components/category";
import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchCategoryQuery,
  searchCategoryQueryVariables,
} from "../../__generated__/searchCategoryQuery";

const SEARCH_CATEGORY_QUERY = gql`
  query searchCategoryQuery($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      category {
        ...CategoryParts
        restaurants {
          ...RestaurantParts
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

interface ISearchCategoryParams {
  slug: string;
}

export const SearchCategory = () => {
  const [page, setPage] = useState(1);
  const { slug } = useParams<ISearchCategoryParams>();
  const { data } = useQuery<searchCategoryQuery, searchCategoryQueryVariables>(
    SEARCH_CATEGORY_QUERY,
    { variables: { input: { page, slug } } }
  );
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <Helmet>
        <title>{`${data?.category.category?.name} Restaurants | Nuber Eats`}</title>
      </Helmet>
      <Category
        id={data?.category.category?.id + ""}
        name={data?.category.category?.name}
        coverImg={data?.category.category?.coverImg}
        slug={data?.category.category?.slug}
      />
      <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 px-8 md:px-12">
        {data?.category.category?.restaurants?.map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id + ""}
            coverImg={restaurant.coverImg}
            name={restaurant.name}
            categoryName={restaurant.category?.name}
          />
        ))}
      </div>
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
          Page {page} of {data?.category.totalPages}
        </span>
        {page !== data?.category.totalPages ? (
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
