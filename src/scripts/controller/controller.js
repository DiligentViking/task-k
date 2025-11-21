export function createController(model, view) {
  return {
    init() {
      view.renderCustomLists(model.getCustomLists());

      view.renderHeading('QWER');

      const todos = model.getTodos('QWER');
      Object.keys(todos).forEach((todoObjKey) => { 
        view.renderTodo(todos[todoObjKey]);
      });
    },
  };
};
