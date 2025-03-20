import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shelter" model, go to https://haven.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "ZLOMaFgv-7nz",
  fields: {
    food: {
      type: "number",
      validations: {
        required: true,
        numberRange: { min: 0, max: 100 },
      },
      storageKey: "DcwkloOunaLx",
    },
    humidity: { type: "string", storageKey: "TMIrnhpbTV6h" },
    latitude: {
      type: "number",
      validations: { required: true },
      storageKey: "_l8IzDIq51sm",
    },
    logitude: {
      type: "number",
      validations: { required: true },
      storageKey: "1PxF9_pmLdqo",
    },
    name: {
      type: "string",
      validations: { required: true },
      storageKey: "g3UrftjlTKX3",
    },
    people: {
      type: "number",
      validations: {
        required: true,
        numberRange: { min: 0, max: 100 },
      },
      storageKey: "iOrkMtAujlly",
    },
    temp: { type: "number", decimals: 2, storageKey: "1tHs9ow85xTM" },
  },
};
