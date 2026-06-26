import type { ContactType } from "@/lib/schemas/contact.schema"
import { ContactListLayout } from "@/layouts/ContactListLayout"
import type { UuidType } from "@/lib/schemas/util.schema"
import { Checkbox } from "@/components/ui/checkbox"
import { PillAvatar } from "@/components/PillAvatar"

type Props = {
  contacts: ContactType[],
  selectFn: (userId: UuidType | null, checked: boolean) => void,
}
export function ContactList({ contacts, selectFn }: Props) {
  return (
    <ContactListLayout
      isEmpty={!!contacts.length}
      fbText="You can find and add contacts in the Explore section"
    >
      {contacts.map((c) => {
        return (
          <div key={c.id}>
            {c.user &&
              <div
                className="flex justify-between items-center"
              >
                <PillAvatar
                  imgUrl={c.user?.imgUrl!}
                  name={c.nickname ?? c.user.name}
                  className=" justify-between w-full px-3!"
                  titleClassname="text-bg2 text-[0.8em]! font-normal"
                  avatarClassname="size-[2.3em]"
                >
                  <Checkbox
                    className="border-bg3/90 border-[0.12em] size-[0.9em] rounded-xs"
                    defaultChecked={false}
                    onCheckedChange={(checked) => {
                      selectFn(c.userId, checked as boolean);
                    }}
                  >
                  </Checkbox>


                </PillAvatar>
              </div>
            }
          </div>
        )
      })}
    </ContactListLayout>
  )
}
