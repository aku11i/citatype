import type { FC, PropsWithChildren } from "hono/jsx";

type BaseLayoutProps = PropsWithChildren<{
  title: string;
  scene?: "typing";
}>;

export const BaseLayout: FC<BaseLayoutProps> = ({ title, scene, children }) => {
  const bodyClass =
    scene === "typing"
      ? "min-h-screen font-sans text-secondary-900 dark:text-secondary-100 dark"
      : "min-h-screen font-sans text-secondary-900";

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/tailwind.css" />
        <title>{title}</title>
      </head>
      <body class={bodyClass} data-scene={scene}>
        <main class="mx-auto max-w-3xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
};
