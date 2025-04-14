import { join } from "path";
import { readdirSync, readFile } from "fs";

export function loadStadium(stadium: "1s" | "3s" | "4s", onGame: boolean, room: RoomObject) {
	const stadiumAf1s = join(__dirname, "..", "..", "stadiums", `${stadium}.hbs`);

	if (onGame) room.stopGame();

	readFile(stadiumAf1s, "utf8", (error, data) => {
		if (error) {
			console.error("Error al leer el archivo:", error);
			return;
		}

		room.setCustomStadium(data);
	});
}

export function loadEvents(room: RoomObject) {
	const eventsDirectory = join(__dirname, "..", "events");
	const eventFiles = readdirSync(eventsDirectory).filter((file) => file.endsWith(".js"));

	eventFiles.forEach(async (file) => {
		const { default: event } = await import(join(eventsDirectory, file));

		if (!event?.name || typeof event.run !== "function") {
			console.warn(`El archivo ${file} no exporta un evento válido`);
			return;
		}

		if (!event.name.startsWith("on")) {
			console.warn(`El archivo ${file} no representa un evento válido (no empieza con "on")`);
			return;
		}

		(room as any)[event.name] = (...args: any[]) => event.run(room, ...args);
	});
}
