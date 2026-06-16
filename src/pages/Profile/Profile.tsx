import type { SafeUser } from "@/lib/schemas/user.schema"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = {
  user: SafeUser,

}
export function ProfilePage({ user }: Props) {
  return (
    <div>
      <Avatar>
        <AvatarImage src={user.imgUrl} />
      </Avatar>
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

    </div>
  )
}
