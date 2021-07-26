// Created function to delete the task
const deleteTask = (id) => {
  if (confirm("Do you really want to delete?")){
    // if user clicked yes
    $.ajax({
      url: `/tasks/${id}`,
      type: 'POST'
    }).then(() => {
      console.log('Successfully delete the item!')
      location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }
}
