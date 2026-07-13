import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, Link, useActionData } from "react-router-dom";
import { LogoRandom } from "@/components/LogoRandom";
import { ColorCard } from "@/components/ColorCard";
import { Signature } from "@/components/Signature";
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import type { Message } from "../Home/Home";
import { MessagePill } from "@/components/MessagePill";
import type { ActionResult } from "@/lib/utils";

export function SignupPage() {
  const [message, setMessage] = useState<Message | null>(null);
  const actionData = useActionData() as ActionResult | undefined;

  useEffect(() => {
    if (actionData && "error" in actionData) {
      setMessage({ type: "error", body: actionData.error });
    }
  }, [actionData]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <MainLayout>
      {message &&
        <MessagePill
          message={message}
          className="absolute absolute bottom-6 left-6 bg-fg0!
            m-2  opacity-[1]! text-center gap-0"
        />
      }
      <div className="bg-fg1 flex flex-col items-center w-full h-full ">
        <ColorCard>
          <Form
            className="flex flex-col justify-center gap-7 py-2"
            method="post"
            action=""
          >
            <header
              className="min-h-[90px] max-h-[120px] flex items-center justify-center 
            p-4 "
            >
              <LogoRandom className="text-bg2!" />
            </header>
            <FieldGroup
              className="w-full flex flex-col items-center gap-8
             *:px-[5%] [&_*]:text-bg2"
            >
              <Field
                orientation="horizontal"
                className="">
                <FieldLabel
                  htmlFor="name">
                  Full Name
                </FieldLabel>
                <Input
                  className="text-bg1/90! placeholder:text-bg3"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </Field>
              <Field
                orientation="horizontal"
                className="">
                <FieldLabel
                  htmlFor="username">
                  Username
                </FieldLabel>
                <Input
                  className="text-bg1/90! placeholder:text-bg3"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="@your_username"
                  required
                />
              </Field>
              <Field
                orientation="horizontal"
                className="">
                <FieldLabel
                  htmlFor="password">
                  Password</FieldLabel>
                <Input
                  className="text-bg1/90! placeholder:text-bg3"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*********"
                  required
                />
              </Field>
              <Field
                orientation="horizontal"
                className="">
                <FieldLabel
                  htmlFor="confirm">
                  Confirm password</FieldLabel>
                <Input
                  className="text-bg1/90! placeholder:text-bg3"
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
                className="text-bg4/90 text-sm font-bold border-bg4/65 bg-fg4/20 border-[1.5px]! hover:bg-bg4/10!"
              >Sign up</Button>
              <p
                className="text-xs text-bg2 flex"
              >Already have an account?
                <Link
                  to="/login"
                  className="block pl-2 font-bold
                  underline text-bg4/70 decoration-[0.12em] 
                  hover:text-bg4  hover:font-black
                  "
                >Sign in</Link>
              </p>
            </div>
          </Form>
        </ColorCard>
        <footer
          className="flex items-end"
        >
          <Signature />
        </footer>
      </div>
    </MainLayout>
  );
}
