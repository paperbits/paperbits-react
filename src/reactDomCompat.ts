/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

const rootMap = new WeakMap<Node, ReactDOMClient.Root>();

/**
 * Backward-compatible wrapper for ReactDOM.render used by legacy Paperbits code.
 * Uses dynamic require() so webpack does not statically analyse react-dom exports
 * and emit a "render not found" warning when targeting React 18+.
 */
export function render(element: React.ReactElement, container: Element | DocumentFragment, callback?: () => void): any {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const reactDOM: any = require("react-dom");
    const legacyRender = reactDOM["render"];

    // React 17 compatibility: use native render when available.
    if (typeof legacyRender === "function") {
        return legacyRender(element, container, callback);
    }

    const nodeType = (<Node>container)?.nodeType;

    if (!container || (nodeType !== Node.ELEMENT_NODE && nodeType !== Node.DOCUMENT_FRAGMENT_NODE)) {
        throw new Error("ReactDOM.render: container must be a valid DOM node");
    }

    let root = rootMap.get(container);

    if (!root) {
        root = ReactDOMClient.createRoot(container);
        rootMap.set(container, root);
    }

    const flushSync = reactDOM["flushSync"];

    // Legacy code reads refs right after render call, so preserve synchronous timing.
    if (typeof flushSync === "function") {
        flushSync(() => root.render(element));
    }
    else {
        root.render(element);
    }

    if (callback) {
        Promise.resolve().then(callback);
    }

    return root;
}
