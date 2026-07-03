import type { ContactType } from "@/lib/schemas/contact.schema"
import { ContactListLayout } from "@/layouts/ContactListLayout"
import type { UuidType } from "@/lib/schemas/util.schema"
import { PillAvatar } from "@/components/PillAvatar"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
  contacts: ContactType[],
  selected: UuidType[],
  selectFn: (userId: UuidType | null, checked: boolean) => void,
}

export function ContactList({ contacts, selected, selectFn }: Props) {
  const bg3 = "text-bg2! border-fg4!"
  const bg4 = "text-bg1! border-bg3/80! bg-fg3/30"

  return (
    <ContactListLayout
      isEmpty={!!contacts.length}
      fbText="You can find and add contacts in the Explore section"
    >
      {contacts.map((c) => {
        const isSelected = !!c.userId && selected.includes(c.userId)
        const color = isSelected ? bg4 : bg3

        return (
          <div key={c.id}>
            {c.user &&
              <div
                className={`group flex justify-between items-center ${color}`}
              >
                <PillAvatar
                  imgUrl={c.user?.imgUrl!}
                  name={c.nickname ?? c.user.name}
                  className={`justify-between w-full px-3! ${color}`}
                  titleClassname={`text-[0.8em]! font-normal ${color}`}
                  avatarClassname="size-[2.3em]"
                >
                  <div className=" flex items-center gap-2 p-1">
                    <Checkbox
                      checked={isSelected}
                      className="border-bg3 border-[1px] size-[1em] rounded-full"
                      onClick={() => selectFn(c.userId, !isSelected)}
                      aria-label={`${isSelected ? "Unselect" : "Select"} ${c.nickname ?? c.user.name}`}
                      title={`${isSelected ? "Unselect" : "Select"} ${c.nickname ?? c.user.name}`}
                    >
                    </Checkbox>
                  </div>
                </PillAvatar>
              </div>
            }
          </div>
        )
      })}
    </ContactListLayout>
  )
}
