export const startingGameState = {
    resources: {
        wood: 0,
        coal: 0,
        iron: 0,
        snow: 0,
        sugar: 0
    }
  };
export type GameState = typeof startingGameState;

export function update(state: GameState) {
  state.resources.wood += 1;
  state.resources.coal += 10;
}