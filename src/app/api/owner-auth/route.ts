import { ownerAuth } from "@/lib/owner-auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(ownerAuth);