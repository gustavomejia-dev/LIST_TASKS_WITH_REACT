import React from "react";
import "./Task.css"
import {CgClose, CgInfo} from 'react-icons/cg'
import { useNavigate} from 'react-router-dom'; // import do hook
const Task = ({ task, handleTaskClick, handleTaskDeletion }) => {
    const history = useNavigate()
    const handleTaskDetailsClick = ()=>{
        history(`/${task.title}`)//func para mostrar o titutlo e detalhes da tarefa

    }
    return ( 
        <div className="task-container" style={task.completed 
        ? {borderLeft: '6px solid white'} : {}}>

            <div className="task-title" onClick={() => handleTaskClick(task.id)}>{task.title}</div>
            <div className="buttons-container">
                <button onClick={()=> handleTaskDeletion(task.id)} 
                className="remove-task-button"><CgClose/></button>
                <button  
                className="see-task-details-button" onClick={handleTaskDetailsClick}><CgInfo/></button>
            </div>
        </div>
        // <div className="task-container">{task.title}</div>
            

     );
}
 
export default Task;