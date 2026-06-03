import type { ContactType } from "@/lib/schemas/contact.schema"
import { UserThumbnail } from "@/components/UserThumbnail"
import { ModalListLayout } from "@/layouts/ModalListLayout"
import type { UuidType } from "@/lib/schemas/util.schema"
import { Checkbox } from "@/components/ui/checkbox"

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
            className="flex justify-between items-center px-3.5 py-[0.5em] border-b-[0.13em] border-fg3"
            key={c.id}
          >
            <UserThumbnail
              imgUrl={c.user!.imgUrl!}
              fullName={c.user!.name}
              className="text-fg1 p-0"
            />
            <Checkbox
              className="border-fg3 border-[0.13em] rounded-xs"
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
