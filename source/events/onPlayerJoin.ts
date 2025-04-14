export default {
	name: "onPlayerJoin",

	run: function (room: RoomObject, _player: PlayerObject) {
		setTimeout(() => room.startGame(), 10000);
	},
};
