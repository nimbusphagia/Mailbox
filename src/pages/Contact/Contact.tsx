import type { ContactType } from "@/lib/schemas/contact.schema";

type Props = {
  contact: ContactType | null,
}
export function ContactPage({ contact }: Props) {
  console.log(contact);
  return (
    <div className="size-full">
      <>
        {contact ?
          contact.user?.name :
          "No contact"
        }
      </>
    </div>
  )
}
