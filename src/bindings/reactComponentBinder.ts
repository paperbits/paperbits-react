/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { ComponentBinder } from "@paperbits/common/editing/componentBinder";
import { IInjector } from "@paperbits/common/injection";
import { ReactComponentWrapper } from "./reactComponentWrapper";


export class ReactComponentBinder implements ComponentBinder {
    constructor(private readonly injector: IInjector) { }

    public async bind<TInstance>(element: Element, componentDefinition: any, componentParams: unknown): Promise<TInstance> {
        const params = componentParams || {};
        const componentReference = React.createRef<TInstance>();
        params["ref"] = componentReference

        const reactElement = React.createElement(ReactComponentWrapper, {
            inversifyContainer: this.injector["container"], // hack to access private property
            childComponents: React.createElement(componentDefinition, params)
        });

        ReactDOM.render(reactElement, element);

        const reactComponentInstance = componentReference.current;
        return reactComponentInstance;
    }

    public async dispose(element: Element): Promise<void> {
        // Not supported
    }
}