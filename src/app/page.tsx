import { taskRouter } from '../server/task.router'
import TaskTable from '../components/task.table'

export default async function Home() {
  const caller = taskRouter.createCaller({})
  const tasks = (await caller.list())

  return (
    <main className="container py-4">
      <TaskTable initialTasks={tasks} />
    </main>
  )
}