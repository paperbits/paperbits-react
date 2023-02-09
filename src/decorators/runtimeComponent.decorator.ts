/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { ReactRuntimeComponentConfig } from "./reactRuntimeComponentConfig";
import { registerCustomElement } from "../customElements";

export function RuntimeComponent(config: ReactRuntimeComponentConfig): (target: any) => void {
    return (target) => {
        registerCustomElement(target, config.selector);
    };
}