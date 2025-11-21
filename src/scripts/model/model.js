export function createListModel() {
  const lists = {};

  localStorage.clear();  // Devving

  const save = () => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }

  return {
    addList(listName) {
      if (lists[listName]) {
        console.error('List already exists');
        return;
      }

      lists[listName] = {todos: {}};
      save();
    },


    deleteList(listName) {
      if (lists[listName].todos.length) {
        console.error('List must be empty before deletion');
        return;
      }

      delete lists[listName];
      save();
    },


    // Todo Funcs //

    addTodo(listName, title, notes, priority, datetimedue, isDone=null) {
      const todoID = crypto.randomUUID().toString().slice(0, 8);

      lists[listName].todos[todoID] = {title, notes, priority, datetimedue, isDone};
      save();

      return todoID;
    },


    linkTodoToToday(listName, todoID) {
      lists[listName].todos[todoID]
    },


    markTodoAsDone(listName, todoID) {
      lists[listName].todos[todoID].isDone = 1;
      save();
    },

    markTodoAsNotDone(listName, todoID) {
      lists[listName].todos[todoID].isDone = null;
      save();
    },
  };
}
