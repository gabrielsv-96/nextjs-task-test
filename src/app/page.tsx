'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '../utils/trpc'

export default function Home() {
  const router = useRouter()
  const [editId, setEditId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ titulo: '', descricao: '' })

  const utils = trpc.useUtils()
  const { data: tasks = [] } = trpc.list.useQuery()

  const invalidate = () => utils.list.invalidate()
  const update = trpc.update.useMutation({ onSuccess: () => { invalidate(); setEditId(null) } })
  const del = trpc.delete.useMutation({ onSuccess: invalidate })

  return (
    <main>
      <div>
        <h1>Tarefas</h1>
        <button onClick={() => router.push('/new-task')}>+ Nova tarefa</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Criação</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              {editId === task.id ? (
                <>
                  <td>{task.id}</td>
                  <td>
                    <input value={editForm.titulo} onChange={e => setEditForm(f => ({ ...f, titulo: e.target.value }))}/>
                  </td>
                  <td>
                    <input value={editForm.descricao} onChange={e => setEditForm(f => ({ ...f, descricao: e.target.value }))}/>
                  </td>
                  <td>
                    {new Date(task.dataCriacao).toLocaleString('pt-BR')}
                  </td>
                  <td>
                    <div>
                      <button onClick={() => update.mutate({ id: task.id, ...editForm })}>Salvar</button>
                      <button onClick={() => setEditId(null)}>Cancelar</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{task.id}</td>
                  <td>{task.titulo}</td>
                  <td>{task.descricao}</td>
                  <td>{new Date(task.dataCriacao).toLocaleString('pt-BR')}</td>
                  <td>
                    <div>
                      <button onClick={() => {
                        setEditId(task.id)
                        setEditForm({ titulo: task.titulo, descricao: task.descricao })
                      }}>
                        Editar
                      </button>
                      <button onClick={() => del.mutate({ id: task.id })}>Excluir</button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}

          {tasks.length === 0 && (
            <tr>
              <td>
                Nenhuma tarefa cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}