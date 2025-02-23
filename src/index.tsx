import { batch } from "solid-js";
import { createMutable } from "solid-js/store";
import { render } from "solid-js/web";
import { GameState, startingGameState, update, updateRate } from "./game";
import Game from "./ui";

// QUIN - you should never need to change this file!
// this glues everything else together & does some fucky stuff to
// let the auto updating work without resetting the game state.
// i might need to change it tho cos this is fucky af.

const state: GameState = createMutable(startingGameState);

function makeUpdateWorker(
	update: (state: GameState) => void,
	updateRate: number,
) {
	const worker = new Worker(
		URL.createObjectURL(
			new Blob(
				[`setInterval(() => postMessage(undefined), ${updateRate * 1000})`],
				{ type: "application/javascript" },
			),
		),
	);
	worker.onmessage = () => batch(() => update(state));
	return worker;
}

let worker = makeUpdateWorker(update, updateRate);

// trying to fix the thing where it live reloads
// this is a bit shit but it works for now
if (import.meta.hot) {
	import.meta.hot.accept("./game", (mod) => {
		if (!mod) return;

		worker.terminate();
		merge(state, mod.startingGameState);
		worker = makeUpdateWorker(mod.update, mod.updateRate);

		function merge(x: any, y: any) {
			if (x === null) return;
			if (typeof x !== "object") return;

			for (const key of Object.keys(y)) {
				if (!Object.hasOwn(x, key)) {
					x[key] = y[key];
				} else if (typeof y[key] === "function") {
					x[key] = y[key].bind(x);
				} else {
					merge(x[key], y[key]);
				}
			}
		}
	});
}

const root = document.getElementById("root");
render(() => <Game game={state} />, root!);
