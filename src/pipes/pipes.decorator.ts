import { ComponentInterface } from "../interfaces/component-interface";
import { PipeInterface } from "../interfaces/pipe.interface";

export function Pipes(...pipes: PipeInterface[]) {
    return function(target: ComponentInterface) {
        if (!target.pipes) {
            target.pipes = {};
        }
        pipes.forEach(pipe => {
            target.pipes![pipe.selector!] = pipe;
        });
    }
}

