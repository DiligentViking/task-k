export function createController(model, view) {
  let editOnClick = false;

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

      view.onListButtonSelect((e, listName) => {
        console.log('List button selected');
        if (editOnClick) {
          editOnClick = false;
          e.stopPropagation();
          view.toggleSidebarCursorEditScheme();
          view.renderEditableListButton(e.target);
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

      view.onEditlistButtonSelect(() => {
        editOnClick = true;
        view.toggleSidebarCursorEditScheme();
      });

      view.onFinishEditing((target, editableListButton, newlistButton) => {
        if (editableListButton && target !== editableListButton && target !== newlistButton) {
          console.log('Editing finished');
          view.replaceEditableListButtonWithRealListButton(editableListButton);
          model.addList(editableListButton.textContent);
        }
      });
    },
  };
};
