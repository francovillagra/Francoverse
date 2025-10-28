"use client";

import { PropsWithChildren } from "react";
import RouteTransitions from "./RouteTransitions";

export default function ClientLayout({ children }: PropsWithChildren) {
  return <RouteTransitions>{children}</RouteTransitions>;
}
