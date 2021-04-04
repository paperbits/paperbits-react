import { Bag } from "@paperbits/common";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ComponentBinder } from "@paperbits/common/editing/componentBinder";
import { ReactComponentBinder } from "./bindings";


export class ReactModule implements IInjectorModule {
    public register(injector: IInjector): void {
        const componentBinders = injector.resolve<Bag<ComponentBinder>>("componentBinders");
        componentBinders["react"] = new ReactComponentBinder();
    }
}