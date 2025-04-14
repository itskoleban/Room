import { createEvent } from "../../utilities/bases";

export default createEvent({
	name: "onPlayerLeave",

	run(room, player) {
		console.log(room, player);
	},
});
