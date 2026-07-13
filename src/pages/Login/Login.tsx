import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, Link, useSearchParams } from "react-router-dom";
import { LogoRandom } from "@/components/LogoRandom";
import { ColorCard } from "@/components/ColorCard";
import { Signature } from "@/components/Signature";
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import type { Message } from "../Home/Home";
import { MessagePill } from "@/components/MessagePill";
import { KeyRound, UserRound } from "lucide-react";

export function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (searchParams.get("registered")) {
      setMessage({ type: "success", body: "User registered." });
      setSearchParams({});
    }
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(t);
  }, [message]);
  return (
    <MainLayout
    >
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
            className="flex flex-col justify-center gap-5 p-2"
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
              className="w-full flex flex-col items-center
             *:px-[8%] [&_*]:text-bg2"
            >
              <Field
                orientation="horizontal"
                className="">
                <FieldLabel
                  htmlFor="username">
                  <UserRound className="size-[1em]" />
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
                  <KeyRound className="size-[1em]" />
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
            </FieldGroup>
            <div className="flex flex-col gap-4 w-full items-center self-center p-3 min-h-[50px]">
              <Button
                type="submit"
                className="text-bg4/90 text-sm font-bold border-bg4/65 bg-fg4/20 border-[1.5px]! hover:bg-bg4/10!"
              >Sign in</Button>
              <p
                className="text-xs text-bg2 flex"
              >Don't have an account yet?
                <Link
                  to="/signup"
                  className="block pl-2 font-bold
                  underline text-bg4/70 decoration-[0.12em] 
                  hover:text-bg4  hover:font-black
                  "
                >Register</Link>

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

    </MainLayout >
  )
}
