import {
  deleteEvent,
  getEventById,
  getLikesByEventId,
  getMyLikesByEventId,
  likeEvent,
} from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  event,
  isOwner,
  onDelete,
  likes,
  showLikeButton,
  onLike
) => html`<section
id="detailsPage"
>
<div id="detailsBox">
<div class="detailsInfo">
<h1>${event.title}</h1>
<div>
<img src=${event.imageUrl} />
</div>
</div>

<div class="details">
<h3>Theater Description</h3>
<p>${event.description}</p>
<h4>Date: ${event.date}</h4>
<h4>Author: ${event.date}</h4>

${
  isOwner
    ? html`<div class="buttons">
        <a @click=${onDelete} class="btn-delete" href="/">Delete</a>
        <a class="btn-edit" href="/edit/${event._id}">Edit</a>
      </div>`
    : ""
}
        ${likesControlsTemplate(showLikeButton, onLike)}
        </div>
        <p class="likes">Likes: ${likes}</p>
        </div>
        </div>
        </div>
        </section>`;

const likesControlsTemplate = (showLikeButton, onLike) => {
  if (showLikeButton) {
    return html`<a @click=${onLike} class="btn-like" href="javascript:void(0)"
      >Like</a
    >`;
  } else {
    return null;
  }
};

export async function detailsView(ctx) {
  const userData = getUserData();
  let [event, likes, hasLike] = await Promise.all([
    getEventById(ctx.params.id),
    getLikesByEventId(ctx.params.id),
    userData ? getMyLikesByEventId(ctx.params.id, userData.id) : 0,
  ]);

  let isOwner = userData && userData.id == event._ownerId;
  let showLikeButton = isOwner == false && hasLike == false && userData != null;
  ctx.render(
    detailsTemplate(event, isOwner, onDelete, likes, showLikeButton, onLike)
  );

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this meme?");

    if (choice) {
      await deleteEvent(ctx.params.id);
      ctx.page.redirect("/");
    }
  }

  async function onLike() {
    await likeEvent(ctx.params.id);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
