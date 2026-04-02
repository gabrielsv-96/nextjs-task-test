import { initTRPC } from '@trpc/server'
import { z } from 'zod'

type Task = {
  id: number
  titulo: string
  descricao: string
  dataCriacao: string
}

let store: Task[] = []
let nextId = 1


const t = initTRPC.create()

const taskInput = z.object({
  titulo:   z.string().min(1),
  descricao: z.string(),
})

export const appRouter = t.router({

  list: t.procedure
    .query(() => store),

  create: t.procedure
    .input(taskInput)
    .mutation(({ input }) => {
      const task: Task = {
        id: nextId++,
        titulo: input.titulo,
        descricao: input.descricao,
        dataCriacao: new Date().toISOString(),
      }
      store.push(task)
      return task
    }),

  update: t.procedure
    .input(taskInput.extend({ id: z.number() }))
    .mutation(({ input }) => {
      const task = store.find(t => t.id === input.id)
      if (!task) throw new Error('Tarefa não encontrada')
      task.titulo = input.titulo
      task.descricao = input.descricao
      return task
    }),

  delete: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      store = store.filter(t => t.id !== input.id)
      return { success: true }
    }),
})

export type AppRouter = typeof appRouter