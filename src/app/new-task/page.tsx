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
    <main className='container py-4'>
      <button className='btn btn-danger mb-3' onClick={() => router.back()}>
        Voltar
      </button>

      <h1 className='h3 mb-4'>Nova tarefa</h1>

      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className="form-label">
            <span>Título</span>
            <input
              value={form.titulo}
              onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
              placeholder="Ex: Implementar teste"
              className="form-control"
              autoFocus
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            <span>Descrição</span>
            <textarea
              value={form.descricao}
              onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
              placeholder="Detalhes da tarefa..."
              className="form-control"
              rows={4}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!form.titulo.trim() || create.isPending}>
          {create.isPending ? 'Salvando...' : 'Criar tarefa'}
        </button>
      </form>
    </main>
  )
}