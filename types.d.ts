export interface IResetTeams {
	losingTeam: 1 | 2;
	players: PlayerObject[];
	room: RoomObject;
	teamSwap: 0 | 2;
	winningTeam: 1 | 2;
}

type RoomEventKeys = {
	[K in keyof RoomObject]: K extends `on${string}`
		? RoomObject[K] extends (...args: any[]) => any
			? K
			: never
		: never;
}[keyof RoomObject];

type RoomEventArguments<K extends RoomEventKeys> = RoomObject[K] extends (...args: infer A) => any
	? A
	: never;

type EventHandler<K extends RoomEventKeys = RoomEventKeys> = {
	name: K;
	run: (room: RoomObject, ...args: RoomEventArguments<K>) => void;
};
