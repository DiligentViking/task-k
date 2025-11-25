export function createController(model, view) {
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
        if (listName) {
          renderContentArea(listName);
        }
      });


      // Content //

      renderContentArea('Today');


      // Dialogs //

      view.onNewlistButtonSelect(() => {
        view.renderEditableListButton();
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
