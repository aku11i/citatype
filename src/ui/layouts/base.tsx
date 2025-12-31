import type { FC, PropsWithChildren } from 'hono/jsx'

type BaseLayoutProps = PropsWithChildren<{
  title: string
}>

export const BaseLayout: FC<BaseLayoutProps> = ({ title, children }) => {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
