import type { FC, PropsWithChildren } from "hono/jsx";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent",
      },
      color: {
        primary: "focus-visible:ring-accent-muted",
        secondary: "focus-visible:ring-accent-muted",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        class:
          "bg-accent-primary text-text-inverse hover:bg-accent-muted hover:text-text-primary disabled:bg-bg-disabled disabled:text-text-disabled",
      },
      {
        variant: "solid",
        color: "secondary",
        class:
          "bg-bg-selected text-text-inverse hover:bg-accent-primary disabled:bg-bg-disabled disabled:text-text-disabled",
      },
      {
        variant: "outline",
        color: "primary",
        class: "text-accent-primary hover:text-text-primary disabled:text-text-disabled",
      },
      {
        variant: "outline",
        color: "secondary",
        class: "text-text-secondary hover:text-text-primary disabled:text-text-disabled",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
    },
  },
);

type ButtonBaseProps = PropsWithChildren<{
  variant?: VariantProps<typeof buttonVariants>["variant"];
  color?: VariantProps<typeof buttonVariants>["color"];
  class?: string;
}>;

type ButtonAsButton = ButtonBaseProps & {
  as?: "button";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonAsAnchor = ButtonBaseProps & {
  as: "a";
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button: FC<ButtonProps> = (props) => {
  if (props.as === "a") {
    const { href, external, variant, color, class: className, children } = props;
    const target = external ? "_blank" : undefined;
    const rel = external ? "noreferrer" : undefined;

    return (
      <a
        href={href}
        target={target}
        rel={rel}
        class={buttonVariants({ variant, color, class: className })}
      >
        {children}
      </a>
    );
  }

  const { type = "button", disabled, variant, color, class: className, children } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      class={buttonVariants({ variant, color, class: className })}
    >
      {children}
    </button>
  );
};
