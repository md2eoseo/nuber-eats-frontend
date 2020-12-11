import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurantsQuery } from "../../__generated__/myRestaurantsQuery";
import { Link } from "react-router-dom";

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurantsQuery {
    myRestaurants {
      ok
      error
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<myRestaurantsQuery>(MY_RESTAURANTS_QUERY);
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="container">
        <h1 className="text-4xl font-bold ml-20 mt-10">My Restaurants</h1>
        <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 px-4 md:px-12">
          <Link to="/add-restaurant">
            <div className="w-full h-48 rounded-lg transform transition-transform hover:-translate-y-4 bg-gray-100 flex justify-center items-center">
              <FontAwesomeIcon icon={faPlusCircle} className="text-4xl" />
              <span className="text-2xl ml-4">Add restaurant...</span>
            </div>
          </Link>
          {data?.myRestaurants.results?.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{ backgroundImage: `url(${restaurant.coverImg})` }}
              className="w-full h-48 rounded-lg bg-cover bg-center relative transform transition-transform hover:-translate-y-4 border border-black overflow-hidden"
            >
              <div className="absolute w-full bottom-0 bg-white flex justify-between items-baseline p-4 m-0">
                <span className="text-xl">{restaurant.name}</span>
                <span>{restaurant.category?.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
