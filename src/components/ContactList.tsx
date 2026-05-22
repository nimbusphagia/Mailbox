import type { ContactType } from "@/lib/schemas/contact.schema"
import { UserThumbnail } from "./UserThumbnail"
import { ModalListLayout } from "@/layouts/ModalListLayout"
import type { UuidType } from "@/lib/schemas/util.schema"
import { Checkbox } from "./ui/checkbox"

type Props = {
  contacts: ContactType[],
  selectFn: (userId: UuidType | null, checked: boolean) => void,
}
export function ContactList({ contacts, selectFn }: Props) {
  return (
    <ModalListLayout
      isEmpty={!!contacts.length}
      fbText="You can find and add contacts in the Explore section"
    >
      <>
        {contacts.map((c) =>
          <div
            className="flex justify-between px-3 py-2 bg-fg4/70"
            key={c.id}
          >
            <UserThumbnail
              imgUrl={c.user!.imgUrl!}
              fullName={c.user!.name}
            />
            <Checkbox
              className="border-bg3 border-2 rounded-xs"
              defaultChecked={false}
              onCheckedChange={(checked) => {
                selectFn(c.userId, checked as boolean);
              }}
            >

            </Checkbox>

          </div>
        )}
      </>
    </ModalListLayout>
  )
}
