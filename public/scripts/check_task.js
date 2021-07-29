// Created function for checkbox -> update task status from incomplete -> complete
const checkTask = (element, id) => {
  $.ajax({
    url: `/tasks/status/${id}`,
    type: 'POST'
  }).then(() => {
    console.log('The task completed!');
    $($(element).parent()).fadeOut();
    loadTasks();
  }).catch((err) => {
    console.log(err);
  })
}