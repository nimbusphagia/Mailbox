import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { LogoVar1 } from "@/components/ui/logo2";

export function SignupPage() {
  return (
    <RootLayout
      route="Signup"
      footerMessage="Already have an account? "
      footerLink={{
        src: "/login",
        message: "Login"
      }}>
      <div className="bg-bg3 flex justify-center w-full h-full ">
        <Form
          className=" bg-bg4 px-7 pt-9 pb-5 rounded-xs shadow-xs shadow-fg4 flex flex-col gap-8 text-fg1 m-auto "
        >
          <LogoVar1 />
          <FieldGroup className="w-full m-auto gap-4">

            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Mary Sue"
                required />
            </Field>

            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="@your_username"
                required />
            </Field>


            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
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
