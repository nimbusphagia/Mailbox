
interface ErrorComponentProps {
  status?: number;
  message?: string;
}

export function ErrorComponent({ status = 500, message = "Something went wrong" }: ErrorComponentProps) {
  return (
    <div>
      <h1>{status}</h1>
      <p>{message}</p>
    </div>
  );
}
