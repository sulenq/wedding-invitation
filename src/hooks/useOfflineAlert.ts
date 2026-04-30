import { toaster } from "@/components/ui/toaster";
import useOffline from "@/context/disclosure/useOffilne";
import useLang from "@/context/useLang";
import { useEffect, useRef } from "react";

interface Props {
  mounted: boolean;
}

export default function useOfflineAlert(props: Props) {
  const { mounted } = props;

  const { l } = useLang();
  const { setOffline } = useOffline();

  const lastStatus = useRef(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  function handleOnline() {
    setOffline(false);
    toaster.success({
      id: "success_online",
      title: l.success_online.title,
      description: l.success_online.description,
    });
  }

  function handleOffline() {
    setOffline(true);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const interval = setInterval(() => {
      const online = navigator.onLine;

      if (online !== lastStatus.current) {
        lastStatus.current = online;

        if (online) handleOnline();
        else handleOffline();
      }
    }, 1000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, [mounted]);
}
