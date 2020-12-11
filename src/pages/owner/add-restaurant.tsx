import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  addRestaurantMutation,
  addRestaurantMutationVariables,
} from "../../__generated__/addRestaurantMutation";

const ADD_RESTAURANT_MUTATION = gql`
  mutation addRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [addRestaurant, { data, loading }] = useMutation<
    addRestaurantMutation,
    addRestaurantMutationVariables
  >(ADD_RESTAURANT_MUTATION);
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="mt-4 md:mt-10 flex flex-col justify-center items-center">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full md:mb-5"
      >
        <input
          ref={register({ required: "Restaurant name is required" })}
          name="name"
          type="text"
          placeholder="Restaurant Name"
          className="input"
        />
        <input
          ref={register({ required: "Category is required" })}
          name="categoryName"
          type="text"
          placeholder="Category"
          className="input"
        />
        <input
          ref={register({ required: "Address is required" })}
          name="address"
          type="text"
          placeholder="Address"
          className="input"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Add Restaurant"
        />
      </form>
    </div>
  );
};
