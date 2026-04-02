'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '../../utils/trpc'

const emptyForm = { titulo: '', descricao: '' }

export default function NovaTarefa() {
  const router = useRouter()
  const [form, setForm] = useState(emptyForm)

  const utils  = trpc.useUtils()
  const create = trpc.create.useMutation({
    onSuccess: () => {
      utils.list.invalidate()
      router.push('/')
    },
  })

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!form.titulo.trim()) return
    create.mutate(form)
  }

  return (
    <main >
      <button onClick={() => router.back()}>
        ← Voltar
      </button>

      <h1>Nova tarefa</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input
            value={form.titulo}
            onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
            placeholder="Ex: Implementar autenticação"
            autoFocus
          />
        </label>

        <label>
          <span>Descrição</span>
          <textarea
            value={form.descricao}
            onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
            placeholder="Detalhes da tarefa..."
            rows={4}
          />
        </label>

        <button type="submit" disabled={!form.titulo.trim() || create.isPending}>
          {create.isPending ? 'Salvando...' : 'Criar tarefa'}
        </button>
      </form>
    </main>
  )
}