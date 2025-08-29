import { ZUser } from "@/zodModals";
import { z } from "zod";

export type TUser = z.infer<typeof ZUser>;
