import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { RESTAURANT_FRAGMENT, DISH_FRAGMENT } from "../../fragments";
import {
  restaurantPageQuery,
  restaurantPageQueryVariables,
} from "../../__generated__/restaurantPageQuery";
import {
  createOrder,
  createOrderVariables,
} from "../../__generated__/createOrder";
import {
  CreateOrderItemInput,
  OrderItemOptionInputType,
} from "../../__generated__/globalTypes";

const RESTAURANT_QUERY = gql`
  query restaurantPageQuery($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
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
  const [items, setItems] = useState<CreateOrderItemInput[]>([]);
  const getItem = (dishId: number) => {
    return items.find((item) => item.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItem = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeItem = (dishId: number) => {
    setItems((current) => current.filter((item) => item.dishId !== dishId));
  };
  const hasOption = (dishId: number, option: OrderItemOptionInputType) =>
    Boolean(getItem(dishId)?.options?.find((opt) => opt.name === option.name));
  const toggleItemOption = (
    dishId: number,
    option: OrderItemOptionInputType
  ) => {
    setItems((current) => {
      let newItem;
      const prevOptions =
        getItem(dishId)?.options?.filter((opt) => opt.name !== option.name) ||
        [];
      if (hasOption(dishId, option)) {
        newItem = { dishId, options: prevOptions };
      } else {
        newItem = { dishId, options: [{ name: option.name }, ...prevOptions] };
      }
      return [newItem, ...current.filter((item) => item.dishId !== dishId)];
    });
  };
  const history = useHistory();
  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history.push(`/orders/${orderId}`);
    }
  };
  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, { onCompleted });
  const sendOrder = () => {
    if (placingOrder) {
      return;
    }
    if (items.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm("You are about to place an order");
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +id,
            items,
          },
        },
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>{`${data?.restaurant.restaurant?.name} | Nuber Eats`}</title>
      </Helmet>
      <div
        className="w-full py-48 md:py-20 bg-cover bg-center relative bg-gray-500"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="w-full md:w-1/2 pl-6 pt-6 pb-4 md:pl-16 md:py-14 flex flex-col justify-around gap-y-3 bg-white">
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
      <div className="my-5">
        <button onClick={sendOrder} className="btn px-10 mr-3 mb-3">
          Send Order
        </button>
        {data?.restaurant.restaurant?.menu?.length === 0 ? (
          <h4 className="text-xl mb-5">Please upload a dish!</h4>
        ) : (
          <div className="grid mt=16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurant.restaurant?.menu?.map((dish) => (
              <Dish
                key={dish.id}
                id={dish.id}
                name={dish.name}
                price={dish.price}
                description={dish.description}
                isCustomer={true}
                options={dish.options}
                addItem={addItem}
                removeItem={removeItem}
                isSelected={isSelected(dish.id)}
                toggleItemOption={toggleItemOption}
                hasOption={hasOption}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
