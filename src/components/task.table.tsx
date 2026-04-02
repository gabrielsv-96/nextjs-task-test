'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '../utils/trpc'

type Task = {
  id: number
  titulo: string
  descricao: string
  dataCriacao: string
}

type Toast = {
  id: number
  message: string
  type: 'success' | 'danger'
}

type Props = { initialTasks: Task[] }

export default function TaskTable({ initialTasks }: Props) {
  const router = useRouter()
  const utils  = trpc.useUtils()
  const [toasts, setToasts] = useState<Toast[]>([])

  const { data: tasks = initialTasks } = trpc.list.useQuery(undefined, {
    initialData: initialTasks,
  })

  const addToast = (message: string, type: Toast['type']) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }

  const del = trpc.delete.useMutation({
    onSuccess: () => {
      utils.list.invalidate()
      addToast('Tarefa excluída com sucesso.', 'success')
    },
    onError: (error) => {
      addToast(`Falha ao excluir a tarefa: ${error.message}`, 'danger')
    },
  })

  return (
    <>

      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
        {
          toasts.map(toast => (
            <div
              key={toast.id}
              className={`toast show align-items-center text-bg-${toast.type} border-0 mb-2`}
              role="alert"
            >
              <div className="d-flex">
                <div className="toast-body">{toast.message}</div>
                <button
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                />
              </div>
            </div>
          ))
        }
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Tarefas</h1>
        <button className="btn btn-primary" onClick={() => router.push('/new-task')}>
          Nova tarefa
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: 48 }}>#</th>
              <th style={{ width: 200 }}>Título</th>
              <th>Descrição</th>
              <th style={{ width: 180 }}>Criação</th>
              <th style={{ width: 140 }}></th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.titulo}</td>
                  <td className="text-muted">{task.descricao}</td>
                  <td className="text-muted small">
                    {new Date(task.dataCriacao).toLocaleString('pt-BR')}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => router.push(`/update-task/${task.id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => del.mutate({ id: task.id })}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }

            {
              tasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    Nenhuma tarefa cadastrada.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}