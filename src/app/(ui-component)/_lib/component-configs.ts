import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Component configurations
export const componentConfigs = {
  button: {
    name: "Button",
    description:
      "A versatile button component with multiple variants and sizes",
    component: Button,
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
  card: {
    name: "Card",
    description: "A flexible container component for displaying content",
    component: Card,
    defaultProps: {
      children: "",
      variant: "default" as const,
      padding: "md" as const,
    },
    propControls: {
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "outlined", "elevated"],
      },
      padding: {
        type: "select",
        label: "Padding",
        options: ["none", "sm", "md", "lg"],
      },
    },
  },
  input: {
    name: "Input",
    description: "A customizable input field with validation states",
    component: Input,
    defaultProps: {
      placeholder: "Enter text here...",
      type: "text" as const,
      size: "md" as const,
      variant: "default" as const,
      disabled: false,
    },
    propControls: {
      placeholder: { type: "text", label: "Placeholder" },
      type: {
        type: "select",
        label: "Type",
        options: ["text", "email", "password", "number"],
      },
      size: {
        type: "select",
        label: "Size",
        options: ["sm", "md", "lg"],
      },
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "error", "success"],
      },
      disabled: { type: "boolean", label: "Disabled" },
    },
  },
};

export const components = [
  {
    id: "button",
    name: "Button",
    description:
      "A versatile button component with multiple variants and sizes",
    category: "Form",
    preview: "/api/placeholder/300/200",
  },
  {
    id: "card",
    name: "Card",
    description: "A flexible container component for displaying content",
    category: "Layout",
  },
  {
    id: "input",
    name: "Input",
    description: "A customizable input field with validation states",
    category: "Form",
    preview: "/api/placeholder/300/200",
  },
  {
    id: "badge",
    name: "Badge",
    description: "Small status indicators and labels",
    category: "Display",
    preview: "/api/placeholder/300/200",
  },
  {
    id: "progress",
    name: "Progress",
    description: "Progress indicators for loading states and completion",
    category: "Feedback",
    preview: "/api/placeholder/300/200",
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "User profile images and initials display",
    category: "Display",
    preview: "/api/placeholder/300/200",
  },
];

export const categories = ["All", "Form", "Layout", "Display", "Feedback"];

export type ComponentId = keyof typeof componentConfigs;
