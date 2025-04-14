import HaxballJS from "haxball.js";

import * as include from "../utilities/includes";
import * as constant from "../utilities/constants";

HaxballJS().then((HBInit) => {
	const room = HBInit({
		maxPlayers: 16,
		noPlayer: true,
		public: false,
		roomName: "AF 1v1 | 3v3 | 4v4 | PICK ⚡",
		token: constant.HAXBALL_HEADLESS_TOKEN,
	});

	room.setTimeLimit(4);
	room.setScoreLimit(3);
	room.setTeamsLock(true);

	include.loadStadium("1s", false, room);
	include.loadHandler(room, "events");
});
