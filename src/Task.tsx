import React, {FC } from "react";
import { TaskType } from "./App";

type TaskPropsType = {
    removeTask: (taskId: string) => void;
} & TaskType

const Task: FC<TaskPropsType> = ({id, title, isDone, removeTask}) => {
    const onClickRemoveTaskHandler = () => removeTask(id);
    return (
        <li key={id}>
            <input type="checkbox" checked={isDone} />
            <span>{title}</span>
            <button onClick={onClickRemoveTaskHandler}>&times;</button>
        </li>
    )
}
export default Task;