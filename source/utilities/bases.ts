import type { EventHandler, RoomEventKeys } from "../../types";

export function createEvent<K extends RoomEventKeys>(event: EventHandler<K>): EventHandler<K> {
	return event;
}
