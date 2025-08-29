import { Accordion } from "@/components/ui/accordion";
import { Layers2, MessageCircleCode, Text } from "lucide-react";

export const componentEnum = {
  accordion: "accordion",
  "alert-dialog": "alert-dialog",
  alert: "alert",
  button: "buttom",
};

export const componentCategoryEnum = {
  input: "Inputs",
  surfaces: "Surfaces",
  feedback: "Feedback",
};
// Component configurations
export const componentDetails = [
  // =========== input ============= //

  {
    name: componentEnum.button,
    title: "Button",
    category: componentCategoryEnum.input,
  },
  // =========== surfaces ============= //

  {
    name: componentEnum.accordion,
    title: "Accordion",
    category: componentCategoryEnum.surfaces,
  },
  {
    name: componentEnum.alert,
    title: "Alert",
    category: componentCategoryEnum.surfaces,
  },
  // =========== feedback ============= //

  {
    name: componentEnum["alert-dialog"],
    title: "Alert Dialog",
    category: componentCategoryEnum.feedback,
  },
];

export const componentConfigs = {
  [componentEnum.accordion]: {
    component: Accordion,
    defaultProps: {
      children: "Click me",
      variant: "default" as const,
      size: "default" as const,
      disabled: false,
    },
    propControls: {
      children: { type: "text", label: "Text" },
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "destructive", "outline", "secondary", "ghost"],
      },
      size: {
        type: "select",
        label: "Size",
        options: ["sm", "default", "lg"],
      },
      disabled: { type: "boolean", label: "Disabled" },
    },
  },
};

export const componentCategories = {
  [componentCategoryEnum.input]: {
    icon: Text,
    description: "Input components like Text Fields, Text Areas, and Selects.",
  },

  [componentCategoryEnum.surfaces]: {
    icon: Layers2,
    description: "Surface components like Buttons, Cards, and Modals.",
  },
  [componentCategoryEnum.feedback]: {
    icon: MessageCircleCode,
    description:
      "Feedback components like Alert, Alert Dialog, and Confirmation Dialog.",
  },
};

export type ComponentId = keyof typeof componentConfigs;
