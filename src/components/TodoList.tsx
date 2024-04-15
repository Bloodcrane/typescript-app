import React, { useState } from 'react';

interface TodoListProps {
  language: string;
}

const TodoList: React.FC<TodoListProps> = ({ language }) => {
  const [newTask, setNewTask] = useState<string>('');
  const [todoList, setTodoList] = useState<string[]>([]);
  const [inProgressList, setInProgressList] = useState<string[]>([]);
  const [completedList, setCompletedList] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTodoList([...todoList, newTask]);
      setNewTask('');
    }
  };

  const moveToInProgress = (index: number) => {
    const task = todoList[index];
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
    setInProgressList([...inProgressList, task]);
  };

  const moveToToDo = (index: number) => {
    const task = inProgressList[index];
    const updatedInProgressList = inProgressList.filter((_, i) => i !== index);
    setInProgressList(updatedInProgressList);
    setTodoList([...todoList, task]);
  };

  const completeTask = (index: number) => {
    const task = inProgressList[index];
    const updatedInProgressList = inProgressList.filter((_, i) => i !== index);
    setInProgressList(updatedInProgressList);
    setCompletedList([...completedList, task]);
  };

  return (
    <div className="App">
      <div className="columnTodo">
        <h2>{language === 'en' ? 'To-Do' : 'შესასრულებელი'}</h2>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder={language === 'en' ? 'Add new task' : 'ახალი დავალების დამატება'}
        />
        <button onClick={addTask}>{language === 'en' ? 'Add Task' : 'დაამატე დავალება'}</button>
        <ul>
          {todoList.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => moveToInProgress(index)}>
                {language === 'en' ? 'Move to In Progress' : 'გადაიტანე პროგრესში'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="columnInprogress">
        <h2>{language === 'en' ? 'In Progress' : 'პროგრესშია'}</h2>
        <ul>
          {inProgressList.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => moveToToDo(index)}>
                {language === 'en' ? 'Move to To-Do' : 'დააბრუნე დავალებაში'}
              </button>
              <button onClick={() => completeTask(index)}>
                {language === 'en' ? 'Complete' : 'შესრულება'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="columnCompleted">
        <h2>{language === 'en' ? 'Completed' : 'დასრულებულია'}</h2>
        <ul>
          {completedList.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
