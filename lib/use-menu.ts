import { useCallback, useEffect, useState } from "react";
import type { MenuCategory } from "@/lib/menu";
import { fetchMenu } from "@/lib/menu-api";

type MenuState =
  | { status: "loading" }
  | { status: "ready"; categories: MenuCategory[] }
  | { status: "error" };

/**
 * Fetches the menu once when the component mounts, for Client Components only.
 * There is no polling; `retry` fetches again after an error.
 */
export function useMenu() {
  const [state, setState] = useState<MenuState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchMenu(controller.signal).then(
      (categories) => {
        if (!controller.signal.aborted) setState({ status: "ready", categories });
      },
      () => {
        if (!controller.signal.aborted) setState({ status: "error" });
      },
    );
    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}
