import { page, render } from "./lib.js";
import { logout, register } from "./api/users.js";
import { getUserData } from "./util.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { homeView } from "./views/home.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { profileView } from "./views/profile.js";

const main = document.getElementById("content");

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/create", createView);
page("/theaters/:id", detailsView);
page("/edit/:id", editView);
page("/profile", profileView);

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;

  next();
}

function renderMain(templateResult) {
  render(templateResult, main);
}

function updateNav() {
  const userData = getUserData();
  if (userData) {
    document.querySelector(".user").style.display = "block";
    document.querySelector(".guest").style.display = "none";
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "block";
  }
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
