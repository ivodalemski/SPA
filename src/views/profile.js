import { html } from "../lib.js";
import { getEventsByUser } from "../api/data.js";
import { getUserData } from "../util.js";

const profileTemplate = (events, userData) => html`
  <section id="profilePage">
    <div class="userInfo">
      <div class="avatar">
        <img src="./images/profilePic.png" />
      </div>
      <h2>${userData.email}</h2>
    </div>
    <div class="board">
      <!--If there are event-->
      ${events.length == 0
        ? html`<div class="no-events">
            <p>This user has no events yet!</p>
          </div>`
        : events.map(eventCard)}
    </div>
  </section>
`;

const eventCard = (event) => html` <div class="eventBoard">
  <div class="event-info">
    <img src=${event.imageUrl} />
    <h2>${event.title}</h2>
    <h6>${event.date}</h6>
    <a href="/theaters/${event._id}" class="details-button">Details</a>
  </div>
</div>`;

export async function profileView(ctx) {
  const userData = getUserData();
  const events = await getEventsByUser(userData.id);
  ctx.render(profileTemplate(events, userData));
}
