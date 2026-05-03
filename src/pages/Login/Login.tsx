import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { Form } from "react-router-dom";

export function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form
        className="w-full max-w-sm"
      >
        <Title title="Login" />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="you@example.com" />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" />
          </Field>

          <Button type="submit">Login</Button>
        </FieldGroup>
      </Form>
    </div>
  )
}
