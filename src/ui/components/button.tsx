import type { FC, PropsWithChildren } from "hono/jsx";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition shadow-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent",
      },
      color: {
        primary: "focus-visible:ring-primary-200 dark:focus-visible:ring-primary-400/40",
        secondary: "focus-visible:ring-secondary-200 dark:focus-visible:ring-secondary-600/40",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        class: "bg-primary-500 text-secondary-900 hover:bg-primary-400",
      },
      {
        variant: "solid",
        color: "secondary",
        class:
          "bg-secondary-900 text-white hover:bg-secondary-800 dark:bg-secondary-100 dark:text-secondary-900 dark:hover:bg-white",
      },
      {
        variant: "outline",
        color: "primary",
        class:
          "border border-primary-300 text-primary-800 hover:border-primary-400 hover:text-primary-900 dark:border-primary-500/60 dark:text-primary-200 dark:hover:text-primary-100",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "border border-secondary-200 text-secondary-700 hover:border-secondary-300 hover:text-secondary-900 dark:border-secondary-700 dark:text-secondary-200 dark:hover:text-secondary-100",
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
