// Called from the delete button onClick
const deleteItem = (id) => {
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
