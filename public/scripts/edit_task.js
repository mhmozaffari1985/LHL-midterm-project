// Edit button => showing editTextArea
const editTask = (element) => {
  // finding editTextarea from the edit button(parent, children)
  $($($($($(element).parent()).parent()).parent()).children()[2]).fadeToggle();
}

const saveTask = (element, id) => {
  const $textarea = $($($($($(element).parent()).parent()).parent()).children()[2]);
  const edittedText = $textarea.val();

  console.log(edittedText)
  $.ajax({
    url: `/tasks/update/${id}`,
    type: 'POST',
    data: { task_description: edittedText }
  }).then(() => {
    console.log('Successfully update task');
    $textarea.fadeToggle();
    location.reload();
  }).catch((err) => {
    console.log(err);
  })
}