import FormInput from "../components/FormInput";
import { Link, useActionData, Form } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLogin } from "../hooks/useLogin";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  return { email, password };
};

function Login() {
  const { loginWithEmailandPassword } = useLogin();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      if (!data.email) {
        toast.error("Barcha maydonlarni to'ldirish shart!");
      }
      loginWithEmailandPassword(data.dispalayName, data.email, data.password);
    }
  }, [data]);

  return (
    <div
      style={{
        backgroundImage: "url(../public/login.png)",
      }}
      className="h-screen grid place-items-center w-full bg-cover bg-center"
    >
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl text-center mb-5 font-bold">Login</h2>
        <FormInput
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
        />
        <div className="my-5">
          <button className="btn btn-warning btn-block">Login</button>
        </div>
        <div className="text-center ">
          <p>
            If you don't have accounter,
            <Link className="link link-warning" to="/register">
              Register
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
