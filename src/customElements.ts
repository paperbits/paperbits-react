/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "reflect-metadata";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Utils from "@paperbits/common/utils";
import { ComponentBinder } from "@paperbits/common/editing";
import { IInjector } from "@paperbits/common/injection";

/**
 * Registers specified React component as custom element.
 * @param reactComponent - React component declaration.
 * @param {string} tag - Name of the tag. If not specified, name of the component used.
 */
export function registerCustomElement(reactComponent: any, tag: string, injector?: IInjector): void {
    Reflect.defineMetadata("injector", injector, reactComponent);

    class RuntimeComponentProxy extends HTMLElement {
        constructor() {
            super();
        }

        public async connectedCallback(): Promise<void> {
            await Utils.delay(10); // Give the host a chance to configure attributes.

            const propsAttr = this.getAttribute("props");
            const props = propsAttr ? JSON.parse(propsAttr) : {};

            if (injector) {
                const componentBinder = injector.resolve<ComponentBinder>("reactComponentBinder");
                componentBinder.bind(this, reactComponent, props);
            }
            else {
                const reactElement = React.createElement(reactComponent, props);
                ReactDOM.render(reactElement, this);
            }
        }

        public disconnectedCallback(): void {
            // Not implemented
        }
    }

    customElements.define(tag, RuntimeComponentProxy)
}