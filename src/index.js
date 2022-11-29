import { App } from "./3D/app";
import "./assets/css/output.css";

const container = document.getElementById("container")
const app = new App(container);
app.onResized();

window.addEventListener("resize",()=>{
    app.onResized();
})

