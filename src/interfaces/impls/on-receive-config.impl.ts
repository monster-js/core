import { Container } from "../../dependency-injection/container";

export interface OnReceiveConfigImpl {
    onReceiveConfig(config: any, container: Container): void;
}