import { v4 as uuid } from "uuid";

/**
 * Modelo de un Todo
 */
export class Todo {
  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
