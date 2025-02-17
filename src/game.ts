export const startingGameState = {
  resources: {
    wood: 0,
    coal: 0,
    iron: 0,
    snow: 0,
    sugar: 0,
  },

  addWood() {
    this.resources.wood += 1;
  },

  addCoal() {
    this.resources.coal += 1;
  },
};
export type GameState = typeof startingGameState;

export function update(state: GameState) {
  state.resources.wood += 1;
}
