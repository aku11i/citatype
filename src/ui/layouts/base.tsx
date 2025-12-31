import type { FC, PropsWithChildren } from 'hono/jsx'

type BaseLayoutProps = PropsWithChildren<{
  title: string
}>

export const BaseLayout: FC<BaseLayoutProps> = ({ title, children }) => {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/tailwind.css" />
        <title>{title}</title>
      </head>
      <body class="min-h-screen bg-slate-50 text-slate-900">
        <main class="mx-auto max-w-3xl px-6 py-10">{children}</main>
      </body>
    </html>
  )
}
