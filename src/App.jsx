import React, { useEffect, useState } from "react"
import './App.css';
import {v4 as uuidv4} from 'uuid'
import { Await, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios"

//components
import AddTask from "./components/AddTask";
import Tasks from './components/Tasks'
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";
import Task from "./components/Task";

function App() {
  //variavel normal não atualiza o componente, diferente do useState
  const [tasks, setTasks] = useState([

    {
      id:'1',
      title: 'estudar programação',
      completed: false,

    },
    {
      id:'2',
      title: 'ler livros',
      completed: true,
    },
   
  ])
  useEffect(()=>{//executa no inicio
    const fetchTask = async ()=>{
      const {data} = await axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10')
      setTasks(data)
    }
  fetchTask()
 

  },[])
  const handleTaskAddition = (taskTitle)=>{
    const newTask = [... tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }]
    setTasks(newTask)

  }
  const handleTaskClick = (taskId) =>{
    const newTasks = tasks.map(task =>{
      if (task.id === taskId) return{... task, completed: !task.completed}
      return task
    })
    setTasks(newTasks)

  }
  const handleTaskDeletion = (taskId) =>{
    const newTasks = tasks.filter(task => task.id != taskId )
    setTasks(newTasks)

  }

  return (
    <Router>
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={<><AddTask handleTaskAddition={handleTaskAddition}/>
            <Tasks tasks={tasks} handleTaskClick={handleTaskClick} 
            handleTaskDeletion={handleTaskDeletion}/></>}>
            
        </Route>
      </Routes>
      <Routes>
        <Route path="/:taskTitle" element={<TaskDetails/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
