import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../server/task.router.js'

export const trpc = createTRPCReact<AppRouter>()