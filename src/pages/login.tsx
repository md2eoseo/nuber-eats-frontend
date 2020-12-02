import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

const MIN_PASSWORD_LEN = 10;

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const { register, getValues, handleSubmit, errors } = useForm<ILoginForm>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const onError = (error: ApolloError) => {
    console.log(error);
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted, onError });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  const onInvalid = () => {
    console.log("cant create account");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="grid gap-3 mt-5 px-5"
        >
          <div>
            <input
              ref={register({
                required: "Email is required",
              })}
              name="email"
              type="email"
              required
              placeholder="Email"
              className="input"
            />
          </div>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <div>
            <input
              ref={register({
                required: "Password is required",
                // minLength: MIN_PASSWORD_LEN,
              })}
              name="password"
              type="password"
              required
              placeholder="Password"
              className="input"
            />
          </div>
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError
              errorMessage={`Password must be more than ${MIN_PASSWORD_LEN} chars.`}
            />
          )}
          <button className="mt-3 btn">
            {loading ? "Loading..." : "Log In"}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
