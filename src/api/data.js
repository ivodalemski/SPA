import { del, get, post, put } from "./api.js";

export async function getAllEvents() {
  return get("/data/theaters?sortBy=_createdOn%20desc&distinct=title");
}

export async function getEventsByUser(userId) {
  return get(
    `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export async function getEventById(id) {
  return get("/data/theaters/" + id);
}

export async function createEvent(event) {
  return post("/data/theaters", event);
}

export async function deleteEvent(id) {
  return del("/data/theaters/" + id);
}

export async function updateEvent(id, event) {
  return put("/data/theaters/" + id, event);
}

export async function likeEvent(eventId) {
  return post("/data/likes", {
    eventId,
  });
}

export async function getLikesByEventId(eventId) {
  return get(
    `/data/likes?where=theaterId%3D%22${eventId}%22&distinct=_ownerId&count`
  );
}

export async function getMyLikesByEventId(eventId, userId) {
  return get(
    `/data/likes?where=theaterId%3D%22${userId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
