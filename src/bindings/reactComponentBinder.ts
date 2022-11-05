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


export class ReactComponentBinder implements ComponentBinder {
    public async bind<TInstance>(element: Element, componentDefinition: any, componentParams: unknown): Promise<TInstance> {
        const reactElement = React.createElement(componentDefinition, componentParams || {});
        const reactComponentInstance = ReactDOM.render(reactElement, element);

        return reactComponentInstance;
    }

    public async dispose(element: Element): Promise<void> {
        // Not supported
    }
}