// Delete task
const deleteIcons = document.querySelectorAll(".delete-icon");
// console.log(deleteIcons.length);
deleteIcons.forEach(icon => {
  icon.addEventListener("click", event =>{
  const taskID = event.target.getAttribute("task-id");
  alert(`Are you sure you want to delete this task?`);
  fetch(`/tasks/delete/${taskID}`, {
      method:'DELETE',
  }).then(res=>res.json())
    .then(data =>{
        if(data.message === 'Task deleted successfully'){
            console.log('Task deleted successfully');
        }
        else{
            alert('Task could not be deleted');
        }
        window.location.reload();
    })
  .catch(err =>{
      console.log(err);
  })
})
});


// Update task
const updateIcons = document.querySelectorAll(".update-icon");
// console.log(updateIcons.length);
updateIcons.forEach(icon => {
  icon.addEventListener("click", event =>{
  const taskID = event.target.getAttribute("task-id");
  const task = event.target.getAttribute("task");
  const newTask = prompt("Enter new task", task);
  fetch(`/tasks/update/${taskID}`, {
      method:'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({task: newTask})
  }).then(res=>res.json())
    .then(data =>{
        if(data.message === 'Task updated successfully'){
            console.log('Task updated successfully');
        }
        else{
            alert('Task could not be updated');
        }
        window.location.reload();
    })
  .catch(err =>{
      console.log(err);
  })
})
});