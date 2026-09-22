import { createContext, useContext } from "react";
import { DEFAULT_CONTENT } from "../data/contentSchema";

export const ContentContext = createContext({
  event: DEFAULT_CONTENT.event,
  site: DEFAULT_CONTENT.site,
  status: "static",
  connected: false,
});

export function useContent() {
  return useContext(ContentContext);
}