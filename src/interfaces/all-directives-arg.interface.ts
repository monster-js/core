import { DirectiveArgInterface } from "./directive-arg.interface";
import { ObjectInterface } from "./object.interface";

export interface AllDirectivesArgInterface extends Omit<DirectiveArgInterface, "directive"> {
    directives: ObjectInterface<{ get: () => any, set?: (val?: any) => void; }>;
}