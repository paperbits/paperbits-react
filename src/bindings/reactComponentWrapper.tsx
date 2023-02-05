import "reflect-metadata";
import * as React from "react";
import { Provider } from "inversify-react";

export function ReactComponentWrapper({ inversifyContainer, childComponents }) {
    return (
        <Provider container={inversifyContainer}>
            {childComponents}
        </Provider>
    );
}