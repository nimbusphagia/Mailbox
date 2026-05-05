import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";

export function LoginPage() {
  return (
    <RootLayout
      route="login"
      footerMessage="Don't have an account yet? "
      footerLink={{
        src: "/signup",
        message: "Signup"
      }}>
      <div className="bg-bg3 flex justify-center w-full h-full ">
        <Form
          className=" bg-bg4 px-12 pt-7 pb-4 rounded-xs shadow-xs shadow-fg4 flex flex-col gap-4 text-fg1 m-auto "
        >
          <Logo />
          <FieldGroup className="w-full m-auto ">
            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="text">Username</FieldLabel>
              <Input id="username" type="text" placeholder="@your_username" />
            </Field>

            <Field orientation="horizontal" className="w-[90%] m-auto">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" placeholder="*********" />
            </Field>
            <Button type="submit" className="self-end px-7 mt-2">Login</Button>
          </FieldGroup>
        </Form>

      </div>

    </RootLayout >
  )
}
