export function createListModel() {
  const lists = {};

  const showData = () => console.log(lists);

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
      lists[listName].todos[todoID].isDone = 1;
      showData();
    },

    markTodoAsNotDone(listName, todoID) {
      lists[listName].todos[todoID].isDone = null;
      showData();
    },
  };
}
