import { Client } from "@gadget-client/moviescreen";

export const api = new Client({ environment: window.gadgetConfig.environment });
