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
        renderContentArea(listName);
      });


      // Content //

      renderContentArea('Today');


      // Dialogs //

      view.onNewlistButtonSelect((listName) => {
        if (!listName) {
          console.error('No list name');
          return;
        }
        view.renderListButton(listName);
        model.addList(listName);  // TODO: add error displaying
      });
    },
  };
};
