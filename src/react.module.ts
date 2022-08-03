import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ReactComponentBinder } from "./bindings";


export class ReactModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindSingleton("reactComponentBinder", ReactComponentBinder);
    }
}