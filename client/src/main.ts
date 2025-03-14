import "./style.css";
import { Player } from "./entities/player.ts";
import { Game } from "./models/game.ts";

const canvas = document.getElementById("app") as HTMLCanvasElement;
const game = new Game(canvas);
game.addEntity(new Player());
game.start();
