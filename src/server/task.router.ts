import { initTRPC } from '@trpc/server'
import { taskInput, taskUpdateInput, taskDeleteInput } from './schema'

type Task = {
  id: number
  titulo: string
  descricao: string
  dataCriacao: string
}

let store: Task[] = []
let nextId = 1

const t = initTRPC.create()

export const taskRouter = t.router({
  list: t.procedure
    .query(() => store),

  create: t.procedure
    .input(taskInput)
    .mutation(({ input }) => {
      const task: Task = { id: nextId++, dataCriacao: new Date().toISOString(), ...input }
      store.push(task)
      return task
    }),

  update: t.procedure
    .input(taskUpdateInput)
    .mutation(({ input }) => {
      const task = store.find(t => t.id === input.id)
      if (!task) throw new Error('Tarefa não encontrada')
      task.titulo   = input.titulo
      task.descricao = input.descricao
      return task
    }),

  delete: t.procedure
    .input(taskDeleteInput)
    .mutation(({ input }) => {
      store = store.filter(t => t.id !== input.id)
      return { success: true }
    }),
})

export type AppRouter = typeof taskRouter