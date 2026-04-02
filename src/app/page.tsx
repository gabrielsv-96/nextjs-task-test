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
    <main className='container py-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className='h3 mb-0'>Tarefas</h1>
        <button className='btn btn-primary' onClick={() => router.push('/new-task')}>
          Nova Tarefa
        </button>
      </div>

      { tasks.length === 0 && <h3 className='align-center'> Nenhuma tarefa cadastrada. </h3> }

      { tasks.length > 0 && 
        <div className='table-responsive'>
          <table className='table table-bordered table-hover align-middle'>
            <thead className='table-light'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Título</th>
                <th scope='col'>Descrição</th>
                <th scope='col'>Criação</th>
                <th scope='col'></th>
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
                          <button className='btn btn-success btn-sm' onClick={() => update.mutate({ id: task.id, ...editForm })}>
                            Salvar
                          </button>
                          <button className='btn btn-outline-secondary btn-sm' onClick={() => setEditId(null)}>
                            Cancelar
                          </button>
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
                          <button 
                            className='btn btn-outline-primary btn-sm ml-2' 
                            onClick={() => {setEditId(task.id)
                            setEditForm({ titulo: task.titulo, descricao: task.descricao }) }}>
                            Editar
                          </button>
                          <button 
                            className='btn btn-outline-danger btn-sm'
                            onClick={() => del.mutate({ id: task.id })}>
                            Excluir
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </main>
  )
}