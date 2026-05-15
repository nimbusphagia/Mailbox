import figlet from "figlet";
import { useEffect, useState } from "react";

figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts" });

type Options = {
  font?: string;
};

export function useFiglet(text: string, { font = "Standard" }: Options = {}) {
  const [ascii, setAscii] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    figlet
      .text(text, { font })
      .then((result) => {
        if (!cancelled) {
          setAscii(result ?? null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [text, font]);

  return { ascii, loading, error };
}
