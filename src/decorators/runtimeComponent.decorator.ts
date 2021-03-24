/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Utils from "@paperbits/common/utils";
import { ReactRuntimeComponentConfig } from "./reactRuntimeComponentConfig";

export function RuntimeComponent(config: ReactRuntimeComponentConfig): (target: any) => void {
    return (target) => {
        class RuntimeComponentProxy extends HTMLElement {
            constructor() {
                super();
            }

            public async connectedCallback(): Promise<void> {
                await Utils.delay(10); // Give the host a chance to configure attributes.

                const propsAttr = this.getAttribute("props");
                const props = propsAttr ? JSON.parse(propsAttr) : {};
                const reactElement = React.createElement(target, props);
                ReactDOM.render(reactElement, this);
            }

            public disconnectedCallback(): void {
                // Not implemented
            }
        }

        customElements.define(config.selector, RuntimeComponentProxy);
    };
}