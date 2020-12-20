import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  addRestaurantMutation,
  addRestaurantMutationVariables,
} from "../../__generated__/addRestaurantMutation";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";

const ADD_RESTAURANT_MUTATION = gql`
  mutation addRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      restaurantId
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const onCompleted = (data: addRestaurantMutation) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push("/");
    }
  };
  const [addRestaurant, { data }] = useMutation<
    addRestaurantMutation,
    addRestaurantMutationVariables
  >(ADD_RESTAURANT_MUTATION, {
    onCompleted,
  });
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      addRestaurant({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (e) {}
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
        <input
          ref={register({ required: true })}
          name="file"
          type="file"
          accept="image/*"
        />
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="Add Restaurant"
        />
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
