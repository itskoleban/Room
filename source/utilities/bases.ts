import type { EventHandler, RoomEventKeys } from "../../types";

export function createEvent<K extends RoomEventKeys>(event: EventHandler<K>) {
	return event;
}
