import { PipeInterface } from "../interfaces/pipe.interface";

export function Pipe(selector: string) {
    return function(target: PipeInterface) {
        target.selector = selector;
    }
}
