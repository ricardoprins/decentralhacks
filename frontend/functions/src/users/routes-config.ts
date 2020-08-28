import { Application } from "express";
import { create, all, get, patch, remove } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function routesConfig(app: Application) {
  app.post(
    "/users",
    isAuthenticated,
    isAuthorized({ hasRole: ["auditor", "organizer", "user"] }),
    create
  );

  // lists all users
  app.get("/users", [
    isAuthenticated,
    isAuthorized({ hasRole: ["auditor", "organizer", "user"] }),
    all,
  ]);
  // get :id user
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({
      hasRole: ["auditor", "organizer", "user"],
      allowSameUser: true,
    }),
    get,
  ]);
  // updates :id user
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({
      hasRole: ["auditor", "organizer", "user"],
      allowSameUser: true,
    }),
    patch,
  ]);
  // deletes :id user
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["auditor", "organizer", "user"] }),
    remove,
  ]);
}
