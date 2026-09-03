"use client";

import { useEffect } from "react";
import { useHeaderBreadcrumb, type BreadcrumbItem } from "./HeaderBreadcrumbContext";

/** Registers this page's breadcrumb trail so the header can show it once scrolled. */
export default function SetHeaderBreadcrumb({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const { setItems } = useHeaderBreadcrumb();

  useEffect(() => {
    setItems(items);
    return () => setItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items)]);

  return null;
}
