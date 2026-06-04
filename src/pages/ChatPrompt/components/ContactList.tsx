import type { ContactType } from "@/lib/schemas/contact.schema"
import { ModalListLayout } from "@/layouts/ModalListLayout"
import type { UuidType } from "@/lib/schemas/util.schema"
import { Checkbox } from "@/components/ui/checkbox"
import { PillAvatar } from "@/components/PillAvatar"

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
                  className="text-fg1 justify-between w-full bg-fg2/90! px-3! shadow-lg!"
                  avatarClassname="size-[1.7em]"
                >
                  <Checkbox
                    className="border-bg3/90 border-[0.12em] rounded-xs"
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
    </ModalListLayout>
  )
}
