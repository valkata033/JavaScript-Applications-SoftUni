import {html} from '../../node_modules/lit-html/lit-html.js';
import { getUserTheaters } from '../api/theaterService.js';

const profileTemplate = (theaters, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        
        ${theaters.length > 0
            ? theaters.map(x => eventTemplate(x))
            : html`<div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`
        }
    </div>
</section>
`;

const eventTemplate = (theater) => html`
 <div class="eventBoard">
    <div class="event-info">
        <img src=${theater.imageUrl}>
        <h2>${theater.title}</h2>
        <h6>${theater.date}</h6>
        <a href="/details/${theater._id}" class="details-button">Details</a>
    </div>
</div>
`;

export const profileView = async (ctx) => {
    const userId = ctx.user._id;
    const theaters = await getUserTheaters(userId);

    ctx.render(profileTemplate(theaters, ctx.user));
}