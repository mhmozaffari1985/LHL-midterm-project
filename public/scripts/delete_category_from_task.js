// // Created function to delete the task
const deleteCategoryFromTask = (taskId, categroyId) => {   
  
      if (confirm("Do you really want to delete?")){
        // if user clicked yes
        $.ajax({
          url: `/tasks/categories/delete/${taskId}/${categroyId}`,
          type: 'POST'
        }).then(() => {
          console.log('Successfully delete the category from item!')
          location.reload();
        }).catch((err) => {
          console.log(err);
        })
      }
    };