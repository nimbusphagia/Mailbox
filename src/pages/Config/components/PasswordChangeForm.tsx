import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { PasswordChange } from "@/lib/schemas/auth.schema"
import { KeyRound } from "lucide-react"
import { useState, type Ref } from "react"

type Props = {
  onSubmit: (passwordData: PasswordChange) => void,
  hideFn: () => void,
  ref: Ref<HTMLDivElement>,
}

export function PasswordChangeForm({ onSubmit, hideFn, ref }: Props) {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <FieldGroup
      ref={ref}
      className="border-[1px] border-bg2 bg-fg1/30 w-[60%] rounded-sm mb-15
     [&_*]:text-xs [&_*]:font-normal">
      <FieldSet className="gap-4.5! px-8 py-4">
        <FieldDescription
          className="text-bg3! text-[0.9em]! m-auto text-center pb-1
        ">Use 8–20 characters with at least one uppercase, one lowercase, one number, and one special character.
        </FieldDescription>

        <Field
          orientation="horizontal"
          className="*:text-bg2"
        >
          <FieldLabel
            htmlFor="password"
          >
            Current password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </Field>


        <Field
          orientation="horizontal"
          className="*:text-bg2"
        >
          <FieldLabel
            htmlFor="confirm"
          >
            New password
          </FieldLabel>
          <Input
            id="confirm"
            type="password"
            placeholder="********"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </Field>
        <Field
          orientation="horizontal"
          className="*:text-bg2"
        >
          <FieldLabel
            htmlFor="newPassword"
          >
            Confirm new password
          </FieldLabel>
          <Input
            id="newPassword"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </Field>
        <Field
          orientation="horizontal"
          className="pt-1 *:flex-0 *:rounded-sm justify-between"
        >
          <Button
            onClick={hideFn}
            className="text-bg1"
          >Cancel</Button>
          <Button
            className="border-bg4 text-bg4! *:text-bg4! px-3!"
            onClick={() => {
              if (!currentPassword?.trim() || !confirmPassword?.trim() || !newPassword?.trim()) return;
              onSubmit({ currentPassword, newPassword, confirmPassword });
            }}>
            <KeyRound strokeWidth={1.5} className="size-[1.1em] p-0" />
            Confirm
          </Button>
        </Field>
      </FieldSet>
    </FieldGroup >
  )
}

