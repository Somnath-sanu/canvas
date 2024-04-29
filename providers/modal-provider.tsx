"use client";

import { RenameModal } from "@/components/modals/rename-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
    </>
  );
};

//! use client doesn't mean it will render on client side , its just not a server component

//! doing this to avoid hydration error
