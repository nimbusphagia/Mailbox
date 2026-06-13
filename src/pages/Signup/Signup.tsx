import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, Link, useActionData } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import type { ErrorMessage } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LogoRandom } from "@/components/LogoRandom";
import { ColorCard } from "@/components/ColorCard";
import { Signature } from "@/components/Signature";

export function SignupPage() {
  const actionData = useActionData() as ErrorMessage | undefined;
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    if (actionData?.error) {
      setMessage(actionData.error);
    }
  }, [actionData]);

  return (
    <RootLayout>
      <div className="bg-fg1 flex flex-col items-center w-full h-full">
        <ColorCard>
          <Form
            className="flex flex-col justify-center gap-5 rounded-xs border-[1px] border-fg0 p-2"
            method="post"
            action=""
          >
            <header className="w-full flex items-center justify-center p-5 pb-1">
              <LogoRandom className="min-w-[150px] text-black!" />
            </header>
            <FieldGroup
              className="w-full flex flex-col items-center *:px-[10%]"
            >
              <Field orientation="horizontal">
                <FieldLabel htmlFor="name">Full Name:</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="username">Username:</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="@your_username"
                  required
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="password">Password:</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*********"
                  required
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="confirm">Confirm password:</FieldLabel>
                <Input
                  id="confirm"
                  name="confirmPassword"
                  type="password"
                  placeholder="*********"
                  required
                />
              </Field>
            </FieldGroup>
            <div className="flex flex-col gap-4 w-full items-center self-center p-3 min-h-[50px]">
              <Button
                type="submit"
                className="text-fg0! text-[0.9em]"
              >
                Sign up
              </Button>
              <p className="text-xs text-fg1 flex">
                Already have an account?
                <Link
                  to="/login"
                  className="block pl-2 font-bold underline decoration-[0.12em] hover:text-fg0 hover:font-black"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        </ColorCard>
        <footer className="flex items-end">
          <Signature />
        </footer>
      </div>
    </RootLayout>
  );
}
