import { Container } from "../../dependency-injection/container";
import { ObjectInterface } from "../../interfaces/object.interface";
import { PipeInterface } from "../../interfaces/pipe.interface";

export function registerPipesToDI(pipes: ObjectInterface<PipeInterface>, di: Container) {
    for (const key in pipes) {
        const pipe = pipes[key];
        di.register(pipe, {
            target: pipe,
            singleton: false
        });
    }
}
