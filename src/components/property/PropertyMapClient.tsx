"use client";
import dynamic from "next/dynamic";

export const PropertyMapClient = dynamic(() => import("./PropertyMap").then(mod => mod.PropertyMapFallback), {
  ssr: false,
});
