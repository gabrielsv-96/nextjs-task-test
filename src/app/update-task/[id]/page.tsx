'use client'

import { useParams, useRouter } from 'next/navigation'
import { trpc } from '../../../utils/trpc'
import { TaskForm } from '../../../components/task-form'

export default function EditarTarefa() {
  const router  = useRouter()
  const params  = useParams()
  const id      = Number(params.id)

  const { data: tasks = [], isLoading } = trpc.list.useQuery()
  const task = tasks.find(t => t.id === id)

  if (isLoading) {
    return (
      <main className="container py-4 d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </main>
    )
  }

  if (!task) {
    return (
      <main className="container py-4" style={{ maxWidth: 560 }}>
        <div className="alert alert-danger">Tarefa não encontrada.</div>
        <button className="btn btn-danger" onClick={() => router.push('/')}>
          Voltar
        </button>
      </main>
    )
  }

  return (
    <main className="container py-4" style={{ maxWidth: 560 }}>
      <button className="btn btn-danger mb-3" onClick={() => router.back()}>
        Voltar
      </button>

      <h1 className="h3 mb-4">Editar tarefa #{task.id}</h1>

      <TaskForm
        id={task.id}
        initialValues={{ titulo: task.titulo, descricao: task.descricao }}
      />
    </main>
  )
}