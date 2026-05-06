import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, useActionData } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { LogoVar1 } from "@/components/ui/logo2";
import type { ErrorMessage } from "@/lib/utils";

export function SignupPage() {
  const actionData = useActionData() as ErrorMessage | undefined;

  return (
    <RootLayout
      route="Signup"
      color="purple"
      right={{ message: "Already have an account? " }}
      rLink={{
        src: "/login",
        message: "Login"
      }}
      left={{ message: actionData?.error ?? "", color: "red" }}
    >
      <div className="bg-bg3 flex justify-center w-full h-full ">
        <Form
          method="post"
          action=""
          className=" bg-bg4 px-7 pt-9 pb-5 rounded-xs shadow-xs shadow-fg4 flex flex-col gap-8 text-fg1 m-auto "
        >
          <LogoVar1 />
          <FieldGroup className="w-full m-auto gap-4">

            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
              />
            </Field>

            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="@your_username"
                required />
            </Field>


            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="*********"
                required />
            </Field>

            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel
                htmlFor="confirm"
              >Confirm password
              </FieldLabel>
              <Input
                id="confirm"
                name="confirmPassword"
                type="password"
                placeholder="*********"
                required />
            </Field>

            <Button type="submit" className="self-end px-7 mt-2">signup</Button>
          </FieldGroup>
        </Form>

      </div>

    </RootLayout >
  )
}
