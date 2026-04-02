import { TRPCProvider } from '../providers/trpc'

export const metadata = { title: 'Tarefas' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}