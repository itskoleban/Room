import { createEvent } from "../../utilities/bases";

export default createEvent({
	name: "onRoomLink",

	run(_room: RoomObject, link: string) {
		console.log(`Ingresa al enlace: ${link}`);
	},
});
