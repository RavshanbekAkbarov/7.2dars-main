import { Link, useActionData, Form } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

//components
import FormInput from "../components/FormInput";

//hooks
import { useRegister } from "../hooks/useRegister";

//utilis
import { validateSignupOrLoginData } from "../utilis";
import { Button } from "../components/Button";
import { isPending } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");
  return { displayName, email, password, confirmPassword };
};

function Register() {
  const { isPending } = useSelector((store) => store.user);

  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { registerWithEmailEndPassword } = useRegister();
  const signupActionData = useActionData();

  useEffect(() => {
    if (signupActionData) {
      const { valid, errors } = validateSignupOrLoginData(
        signupActionData,
        true
      );

      if (valid) {
        const { displayName, email, password } = signupActionData;
        registerWithEmailEndPassword(displayName, email, password);
      } else {
        setError(errors);
      }
    }
  }, [signupActionData]);

  return (
    <div
      style={{
        backgroundImage: "url(../public/login.png)",
      }}
      className="h-screen grid place-items-center w-full  bg-cover bg-center"
    >
      <Form
        action=""
        method="post"
        className="max-w-96 mx-auto w-full font-medium"
      >
        <h2 className="text-4xl text-center mb-5 font-bold ">Register</h2>

        <FormInput
          type="text"
          name="name"
          placeholder="Name"
          label="Display Name"
          error={error.displayName && "input-error"}
          errorText={error.displayName}
        />
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          label="Email"
          error={error.email && "input-error"}
          errorText={error.email}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
          error={error.password && "input-error"}
          errorText={error.password}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Repeat Password"
          label="Repeat Password"
          error={error.confirmPassword && "input-error"}
          errorText={error.confirmPassword}
        />

        <div className="my-5 flex flex-col gap-3">
          <Button
            loading={isPending}
            type="warning"
            className="btn btn-warning btn-block"
          >
            Register
          </Button>
        </div>
        <div className="text-center ">
          <p>
            If you have an account,{" "}
            <Link className="link link-warning" to="/login">
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Register;
