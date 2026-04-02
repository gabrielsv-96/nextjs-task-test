import { TRPCProvider } from '../providers/trpc'
import 'bootstrap/dist/css/bootstrap.min.css'

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