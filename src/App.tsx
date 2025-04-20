import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import './App.scss';
import { ITask } from './Interfaces';
import { TodoTask } from './Components/TodoTask';

const  App:FC = () => {
  const [task, setTask] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === 'task'){
      setTask(event.target.value)
    } else {
      setDeadline(Number(event.target.value))
    }
  }

  const addTask = (): void => {
    if(!task && deadline < 0) return 
    const newTask = {taskName: task, deadline: deadline}
    const updatedTasks = [...todoList, newTask]
    setTodoList(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTask('')
    setDeadline(0)
  }

  useEffect(() => {
    const storedTaks = localStorage.getItem('tasks')
    if(storedTaks){
      try{
        const parsedTasks: ITask[]  = JSON.parse(storedTaks)
        if(Array.isArray(parsedTasks)){
          setTodoList(parsedTasks)
        }
      } catch(error){
        console.log('Error')
      }
    }
  }, [])

  const completeTask = (taskNameToDelete: string) :void => {
    const updatedTodoList = todoList.filter(task => task.taskName !== taskNameToDelete)
    setTodoList(updatedTodoList)
    localStorage.setItem('tasks', JSON.stringify(updatedTodoList))
  }

  return (
    <div className="app">
      <div className="header">
        <div className="input-container">
          <input type='text' placeholder='Enter task' name='task' value={task} onChange={handleChange}/>
          <input type='number' placeholder='Add deadline' name='deadline' value={deadline} onChange={handleChange}/>
        </div>
        <button onClick={addTask} className='add-btn'>Add task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask}/>
        })}
      </div>
    </div>
  );
}

export default App;
