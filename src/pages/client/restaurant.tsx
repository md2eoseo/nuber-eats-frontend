import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurantPageQuery,
  restaurantPageQueryVariables,
} from "../../__generated__/restaurantPageQuery";

const RESTAURANT_QUERY = gql`
  query restaurantPageQuery($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const { id } = useParams<IRestaurantParams>();
  const { data } = useQuery<restaurantPageQuery, restaurantPageQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );
  console.log(data);
  return (
    <div className="bg-gray-400">
      <Helmet>
        <title>{`${data?.restaurant.restaurant?.name} | Nuber Eats`}</title>
      </Helmet>
      <div
        className="w-full py-48 md:py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="w-full md:w-1/2 pl-6 pt-6 pb-4 md:pl-16 md:py-14 absolute bottom-0 md:static flex flex-col justify-around gap-y-3 bg-white">
          <div className="text-4xl">
            {data?.restaurant.restaurant?.isPromoted && "👍 "}
            {data?.restaurant.restaurant?.name}
          </div>
          <div>
            <span className="text-md font-light hover:underline">
              <Link
                to={`/category/${data?.restaurant.restaurant?.category?.slug}`}
              >
                {data?.restaurant.restaurant?.category?.name}
              </Link>
            </span>
          </div>
          <div className="text-md font-light">
            {data?.restaurant.restaurant?.address}
          </div>
        </div>
      </div>
    </div>
  );
};
