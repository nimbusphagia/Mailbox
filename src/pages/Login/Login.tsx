import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, useActionData, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { RootLayout, type FMessage } from "@/layouts/RootLayout";
import type { ErrorMessage } from "@/lib/utils";
import { useEffect, useState } from "react";

export function LoginPage() {
  const actionData = useActionData() as ErrorMessage | undefined;
  const [searchParams, setSearchParams] = useSearchParams();

  const [fMessage, setFMessage] = useState<FMessage | undefined>(() => {
    return searchParams.get('registered')
      ? { message: "User registered successfully.", color: "black" }
      : undefined;
  });

  useEffect(() => {
    if (searchParams.get('registered')) {
      setSearchParams({});
    }
  }, []);

  useEffect(() => {
    if (actionData?.error) {
      setFMessage({ message: actionData.error, color: "red" });
    }
  }, [actionData]);

  return (
    <RootLayout
      route="login"
      color="black"
      right={{ message: "Don't have an account yet? " }}
      rLink={{
        src: "/signup",
        message: "Signup",
      }}
      left={fMessage}
    >
      <div className="bg-bg3 flex justify-center w-full h-full ">
        <Form
          className=" bg-bg4 px-12 pt-7 pb-4 rounded-xs shadow-xs shadow-fg4 flex flex-col gap-4 text-fg1 m-auto "
          method="post"
          action=""
        >
          <Logo />
          <FieldGroup className="w-full m-auto ">
            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="@your_username"
                required
              />
            </Field>

            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="*********"
                required
              />
            </Field>
            <Button type="submit" className="self-end px-7 mt-2">Login</Button>
          </FieldGroup>
        </Form>

      </div>

    </RootLayout >
  )
}
