import "reflect-metadata";
import * as React from "react";
import { Provider } from "inversify-react";

export function ReactComponentWrapper({ inversifyContainer, childComponents }) {
    return (
        <Provider container={inversifyContainer}>
            <div className="widget widget-react">
                {childComponents}
            </div>
        </Provider>
    );
}