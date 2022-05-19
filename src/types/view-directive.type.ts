import { ObjectInterface } from "../interfaces/object.interface";

export type ViewDirectiveType = ObjectInterface<ObjectInterface<{ get: () => any, set?: (val?: any) => void; }>>;