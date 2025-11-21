export function createController(model, view) {
  return {
    init() {
      view.renderCustomLists(model.getLists());
    },
  };
};
