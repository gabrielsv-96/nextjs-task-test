'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '../utils/trpc'

type TaskFormProps = {
  id?: number
  initialValues?: { titulo: string; descricao: string }
}

const emptyForm = { titulo: '', descricao: '' }

export function TaskForm({ id, initialValues }: TaskFormProps) {
  const router = useRouter()
  const [form, setForm] = useState(initialValues ?? emptyForm)

  const utils  = trpc.useUtils()
  const isEdit = id !== undefined

  const onCreate = trpc.create.useMutation({
    onSuccess: () => { utils.list.invalidate(); router.push('/') },
  })

  const onUpdate = trpc.update.useMutation({
    onSuccess: () => { utils.list.invalidate(); router.push('/') },
  })

  const mutation = isEdit ? onUpdate : onCreate

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!form.titulo.trim()) return
    isEdit
      ? onUpdate.mutate({ id, ...form })
      : onCreate.mutate(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          className="form-control"
          value={form.titulo}
          onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
          placeholder="Ex: Implementar autenticação"
          autoFocus
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Descrição</label>
        <textarea
          className="form-control"
          value={form.descricao}
          onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
          placeholder="Detalhes da tarefa..."
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={!form.titulo.trim() || mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" />
            Salvando...
          </>
        ) : isEdit ? 'Salvar alterações' : 'Criar tarefa'}
      </button>
    </form>
  )
}