async function TasksPage() {

    const response = await fetch('http://localhost:3000/api/tasks');
    const tasksData = await response.json();

    console.log('tasks: ', tasksData);
    // Display tasks on the server terminal

    return (
        <div>
            <h1>TasksPage</h1>
        </div>
    )
}

export default TasksPage;