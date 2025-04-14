import { createEvent } from "../../utilities/bases";

export default createEvent({
	name: "onPlayerJoin",

	run(room) {
		setTimeout(() => room.startGame(), 10000);
	},
});
