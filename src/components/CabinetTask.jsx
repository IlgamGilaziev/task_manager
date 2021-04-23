import React from "react";
import {host} from "../config";
import {Task} from "./Dashboard/Task";

function Block(props) {
    return (
        <div className="w-100 h-50 border border-primary rounded px-4 mb-2 pb-5 overflow-hidden">
            <h4 className="py-4">{props.name}</h4>
            <div className="h-75">
                <Task {...props}/>
            </div>
        </div>
    );
}

export class CabinetTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: []
        }
    }

    componentDidMount() {
        fetch(host + "/getStatus")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(result[0]);
                console.log(result[3]);
                this.setState({
                    blocks: result.filter(item => {
                        if (item.value === "todo" || item.value === "done") {
                            return true;
                        }
                        console.log(true);
                    }).map(section => {
                        return (
                            <Block
                                key={section.id}
                                id={section.id}
                                value={section.value}
                                name={section.name}
                            />
                        );
                    })
                })
            })
    }

    render() {
        return (
            <div className="container m-0 d-flex flex-wrap text-center p-3 h-100 overflow-hidden">
                {/*<div className="text-center h-100">*/}
                    {this.state.blocks}
                {/*</div>*/}
            </div>
        );
    }
}