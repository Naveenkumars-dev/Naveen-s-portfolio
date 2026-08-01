import { useEffect, useState } from "react";

export function useTypingEffect(words: string[], typeSpeed = 65, deleteSpeed = 35, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
