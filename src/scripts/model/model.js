export function createListModel() {
  const lists = {};

  const showData = () => console.log(lists);

  const updateTodo = (listName, todoID, prop, val) => {
    lists[listName].todos[todoID][prop] = val;
  }

  return {
    addList(listName) {
      if (lists[listName]) {
        console.error('List already exists');
        return;
      }

      lists[listName] = {todos: []};
      showData();
    },


    deleteList(listName) {
      if (lists[listName].todos.length) {
        console.error('List must be empty before deletion');
        return;
      }

      delete lists[listName];
      showData();
    },


    // Todo Funcs //

    addTodo(listName, title, notes, priority, datetimedue, isDone=null) {
      lists[listName].todos.push({title, notes, priority, datetimedue, isDone});
      showData();
    },


    markTodoAsDone(listName, todoID) {
      updateTodo(listName, todoID, 'isDone', 1);
      showData();
    },

    markTodoAsNotDone(listName, todoID) {
      updateTodo(listName, todoID, 'isDone', null);
      showData();
    },
  };
}
