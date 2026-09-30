"use client";

import { useEffect, useState } from "react";

export type StoreStatus = {
  open: boolean;
  closeHour: number;
  isSunday: boolean;
};

const DEFAULT_STATUS: StoreStatus = { open: true, closeHour: 21, isSunday: false };

export function useStoreStatus() {
  const [status, setStatus] = useState<StoreStatus>(DEFAULT_STATUS);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours() + now.getMinutes() / 60;
      const closeHour = day === 0 ? 13 : 21;
      setStatus({ open: hours >= 6 && hours < closeHour, closeHour, isSunday: day === 0 });
    };
    compute();
    const id = setInterval(compute, 60000);
    return () => clearInterval(id);
  }, []);

  return status;
}
