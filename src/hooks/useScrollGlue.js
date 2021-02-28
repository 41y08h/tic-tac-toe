import { useEffect } from "react";

export default function useScrollTo(ref, dependency) {
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [ref, dependency]);
}
