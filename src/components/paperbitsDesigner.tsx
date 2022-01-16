import * as React from "react";
import { attachDesignerTo } from "@paperbits/common/ko/utils";

export class PaperbitsDesigner extends React.Component {
    private readonly ref = React.createRef<HTMLDivElement>();

    constructor(props) {
        super(props);
    }

    public async componentDidMount(): Promise<void> {
        attachDesignerTo(this.ref.current);
    }

    public render(): JSX.Element {
        return (
            <div className="paperbits-designer" ref={this.ref}></div>
        );
    }
}
