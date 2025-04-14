import { createEvent } from "../../utilities/bases";

export default createEvent({
	name: "onRoomLink",

	run(_room, link) {
		console.log(`Ingresa al enlace: ${link}`);
	},
});
