'use client'

import { useRouter } from 'next/navigation'
import { trpc } from '../utils/trpc'

export default function Home() {
  const router = useRouter()

  const utils = trpc.useUtils()
  const { data: tasks = [] } = trpc.list.useQuery()
  const del = trpc.delete.useMutation({ onSuccess: () => utils.list.invalidate() })

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Tarefas</h1>
        <button className="btn btn-primary" onClick={() => router.push('/new-task')}>
          + Nova tarefa
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
            {tasks.map(task => (
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
            ))}

            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  Nenhuma tarefa cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}