import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import Task from "./Task";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    changeFilter: (nextFilter: FilterValuesType) => void;
    addTask: (taskTitle: string) => void;
};

const TodoList: React.FC<TodoListPropsType> = ({
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const isAddTaskPossible = !!newTaskTitle
    const tasksComponents: JSX.Element = tasks.length
        ? <ul>
            {tasks.map((t) => <Task {...t} removeTask={removeTask} />)}
        </ul>
        : <span>Your taskslist is empty</span>

    const changeFilterOnClickHandlerCreator =
        (nextFilter: FilterValuesType): (() => void) => () => changeFilter(nextFilter);

    const onClickAddtaskHandler = () => {
        if (isAddTaskPossible) {
            addTask(newTaskTitle)
            setNewTaskTitle("")
        } 
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddtaskHandler()
    }
    
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                />
                <button
                    disabled={!isAddTaskPossible}
                    onClick={onClickAddtaskHandler}>+</button>
            </div>
            {tasksComponents}
            <div>
                <button onClick={() => changeFilter("all")}>All</button>
                <button onClick={changeFilterOnClickHandlerCreator("active")}>
                    Active
                </button>
                <button onClick={changeFilterOnClickHandlerCreator("completed")}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
