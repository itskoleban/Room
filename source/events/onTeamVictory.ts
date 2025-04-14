import type { IResetTeams } from "../../types";

export default {
	name: "onTeamVictory",

	resetTeams: function (params: IResetTeams) {
		const { losingTeam, players, room, teamSwap, winningTeam } = params;

		players.forEach((player) => {
			if (player.team === losingTeam) {
				room.setPlayerTeam(player.id, teamSwap);
			} else if (player.team === winningTeam && winningTeam === 2) {
				room.setPlayerTeam(player.id, 1);
			}
		});
	},

	run: function (room: RoomObject, scores: ScoresObject) {
		const winningTeam = scores.blue > scores.red ? 2 : 1;
		const losingTeam = winningTeam === 1 ? 2 : 1;

		const players = room.getPlayerList();
		const totalPlayers = players.filter((p) => p.id !== 0).length;

		if (totalPlayers === 1 || totalPlayers === 2) {
			this.resetTeams({ losingTeam, players, room, teamSwap: 2, winningTeam });
			setTimeout(() => room.startGame(), 10000);
			return;
		}

		if (totalPlayers === 4 || totalPlayers === 6 || totalPlayers === 8) {
			players.forEach((p) => room.setPlayerTeam(p.id, 0));

			const shuffled = [...players].sort(() => Math.random() - 0.5);

			shuffled.forEach((player, index) => {
				const team = index % 2 === 0 ? 1 : 2;
				room.setPlayerTeam(player.id, team);
			});

			setTimeout(() => room.startGame(), 15000);
			return;
		}

		this.resetTeams({ losingTeam, players, room, teamSwap: 0, winningTeam });
	},
};
