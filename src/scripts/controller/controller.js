export function createController(model, view) {
  let deleteOnClick = false;

  const renderContentArea = (listName) => {
    view.clearContentArea();

    view.renderHeading(listName);

    const todos = model.getTodos(listName);
    Object.keys(todos).forEach((todoObjKey) => { 
      view.renderTodo(todos[todoObjKey]);
    });
  }

  return {
    init() {
      // Sidebar //
      view.renderCustomLists(model.getCustomLists());

      view.onListButtonSelect((listName) => {
        if (deleteOnClick) {
          deleteOnClick = false;
          view.toggleSidebarCursorDeleteScheme();
          const statusCode = model.deleteList(listName);
          if (statusCode === 1) {
            alert('List must be empty before deletion!');
          }
          else {
            alert('List deleted.');
            view.removeListButton(listName);
          }
        }
        else {
          renderContentArea(listName);
        }
      });


      // Content //

      renderContentArea('Today');


      // Editing //

      view.onNewlistButtonSelect(() => {
        view.renderEditableListButton();
      });

      view.onDeletelistButtonSelect(() => {
        deleteOnClick = true;
        view.toggleSidebarCursorDeleteScheme();
      });

      view.onFinishEditing((target, editableListButton, newlistButton) => {
        if (editableListButton && target !== editableListButton && target !== newlistButton) {
          view.replaceEditableListButtonWithRealListButton(editableListButton);
          model.addList(editableListButton.textContent);
        }
      });
    },
  };
};
