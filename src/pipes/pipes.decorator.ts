import { checkComponentDataSource } from "../component/utils/check-component-data-source";
import { registerPipesToDI } from "../component/utils/register-pipes-to-di";
import { Container } from "../dependency-injection/container";
import { ComponentInterface } from "../interfaces/component-interface";
import { PipeInterface } from "../interfaces/pipe.interface";

export function Pipes(...pipes: PipeInterface[]) {
    return function(target: ComponentInterface) {

        checkComponentDataSource(target);

        const di = new Container(target.dataSource!);

        if (!target.pipes) {
            target.pipes = {};
        }
        pipes.forEach(pipe => {
            target.pipes![pipe.selector!] = pipe;
        });

        registerPipesToDI(target.pipes, di);
    }
}
