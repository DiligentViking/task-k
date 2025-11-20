export function createListModel() {
  const lists = {};

  const addProject = (name) => {
    if (lists[name]) {
      console.error('Project already exists');
      return;
    }
    lists[name] = {todos: []};
    console.log(lists);
  }

  return {addProject};
}
