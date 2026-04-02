import { z } from 'zod'

export const taskInput = z.object({
  titulo: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(50, 'O título deve ter no máximo 50 caracteres'),

  descricao: z
    .string()
    .max(300, 'A descrição deve ter no máximo 300 caracteres'),
})

export const taskUpdateInput = taskInput.extend({
  id: z.number({ required_error: 'O id é obrigatório' }),
})

export const taskDeleteInput = z.object({
  id: z.number({ required_error: 'O id é obrigatório' }),
})