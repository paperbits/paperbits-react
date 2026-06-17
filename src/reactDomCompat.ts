/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";

const rootMap = new WeakMap<Node, ReactDOMClient.Root>();

/**
 * Backward-compatible wrapper for ReactDOM.render used by legacy Paperbits code.
 */
export function render(element: React.ReactElement, container: Element | DocumentFragment, callback?: () => void): any {
    const legacyRender = (<any>ReactDOM).render;

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

    const flushSync = (<any>ReactDOM).flushSync;

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
