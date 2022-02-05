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
import { WidgetBinding } from "@paperbits/common/editing/widgetBinding";

export class ReactComponentBinder implements ComponentBinder {
    public init(element: Element, binding: WidgetBinding<any, any>): void {
        let flowClassName;

        switch (binding.flow) {
            case "block":
                flowClassName = "block";
                break;
            case "inline":
                flowClassName = "inline";
                break;
            case "none":
                flowClassName = "placeholder";
                break;
            default:
                console.warn(`Unknown component flow: ${binding.flow}`);
        }

        element.classList.add(flowClassName);

        const reactElement = React.createElement(binding.viewModelClass, {} /* model? */);
        const viewModelInstance = ReactDOM.render(reactElement, element);
        binding.viewModel = viewModelInstance;

        if (binding.onCreate) {
            binding.onCreate(viewModelInstance);
        }
    }

    public dispose(element: Element, binding: WidgetBinding<any, any>): void {
        if (binding.onDispose) {
            binding.onDispose();
        }
    }
}
