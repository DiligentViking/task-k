import "../styles/index.css";

import { createModel } from "./model/model.js";
import { createView } from "./view/view.js";
import { createController } from "./controller/controller.js";

const model = createModel();
const view = createView();
const controller = createController(model, view);

addAutoContent(); // Dev

controller.init();

/* Dev */
function addAutoContent() {
  if (localStorage.getItem("lists")) return;

  model.addList("Today");
  model.addList("QWER");
  model.addList("ASDF");

  const todoID = model.addTodo(
    "QWER",
    "Do the campaign",
    "Make sure you master the lessons it teaches",
  );
  model.linkTodoToToday("QWER", todoID);

  const todoID2 = model.addTodo("Today", "Reach singularity rank");

  const todoID3 = model.addTodo("QWER", "Try some mods");
  model.markTodoAsDone("QWER", todoID3);

  const todoID4 = model.addTodo("QWER", "Make some mods");
}
