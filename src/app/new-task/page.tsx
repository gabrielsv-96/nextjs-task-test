'use client'

import { useRouter } from 'next/navigation'
import { TaskForm } from '../../components/task.form'

export default function NovaTarefa() {
  const router = useRouter()

  return (
    <main className="container py-4" style={{ maxWidth: 560 }}>
      <button className="btn btn-danger mb-3" onClick={() => router.back()}>
        Voltar
      </button>

      <h1 className="h3 mb-4">Nova tarefa</h1>

      <TaskForm />
    </main>
  )
}