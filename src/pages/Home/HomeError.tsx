import { ErrorComponent } from "@/components/Error";
import { RootLayout } from "@/layouts/RootLayout";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function HomeError() {
  const error = useRouteError();

  let status = 500;
  let message = "An unexpected error occurred";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.data ?? error.statusText;
  } else {
    console.log(error)
  }

  return (
    <RootLayout route="error" color="red">
      <ErrorComponent status={status} message={message} />
    </RootLayout>
  );
}
