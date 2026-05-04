import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";

export function LoginPage() {
  return (
    <RootLayout route="login">
      <div className="bg-bg3 flex justify-center w-full h-full ">
        <Form
          className=" bg-bg4 px-9 pt-8 pb-4 rounded-xs shadow-xs shadow-fg4 flex flex-col gap-6 text-fg1 m-auto mb-40"
        >
          <Logo />
          <FieldGroup className="max-w-[95%] m-auto ">
            <Field orientation="horizontal" >
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="you@example.com" />
            </Field>

            <Field orientation="horizontal">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" />
            </Field>
            <Button type="submit" className="self-end px-7 mt-2">Login</Button>
          </FieldGroup>
        </Form>

      </div>

    </RootLayout>
  )
}
