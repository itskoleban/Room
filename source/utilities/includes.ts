import { join } from "path";
import { readdirSync, readFile } from "fs";

export async function loadHandler(room: RoomObject, handler: "commands" | "events") {
	const directory = join(__dirname, "..", "handlers", handler);
	const files = readdirSync(directory).filter((file) => file.endsWith(".js"));

	for (const file of files) {
		const { default: register } = await import(join(directory, file));

		if (register && register.name && typeof register.run === "function") {
			(room as any)[register.name] = (...args: any[]) => register.run(room, ...args);
		} else {
			console.warn(`El archivo ${file} no exporta un evento válido.`);
		}
	}
}

export function loadStadium(stadium: "1s" | "3s" | "4s", onGame: boolean, room: RoomObject) {
	const stadiumAf = join(__dirname, "..", "..", "stadiums", `${stadium}.hbs`);

	if (onGame) room.stopGame();

	readFile(stadiumAf, "utf8", (error, data) => {
		if (error) {
			console.error("Error al leer el archivo:", error);
			return;
		}

		room.setCustomStadium(data);
	});
}
