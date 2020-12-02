import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";

interface ILoginForm {
  email: string;
  password: string;
}

const MIN_PASSWORD_LEN = 10;

export const Login = () => {
  const { register, watch, handleSubmit, errors } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("cant create account");
  };

  return (
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
              minLength: MIN_PASSWORD_LEN,
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
        <button className="mt-3 btn">Log In</button>
      </form>
    </div>
  );
};
