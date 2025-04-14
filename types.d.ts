export interface IResetTeams {
	losingTeam: 1 | 2;
	players: PlayerObject[];
	room: RoomObject;
	teamSwap: 0 | 2;
	winningTeam: 1 | 2;
}
