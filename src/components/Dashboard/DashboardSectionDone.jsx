import React from "react";
import {Task} from "./Task";
import s from "./DashboardSection.module.css";

export class DashboardSectionDone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        fetch("http://p9152834.beget.tech/php/getArticles.php")
            .then(response => response.json())
            .then(result => {
                this.setState({
                    tasks: result.map(task => {
                        return (<Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                        />);
                    })
                })
            })
    }

    render() {
        return (
            // <div className={s.block}>
            <div className="border border-primary rounded px-4 text-center">
                <h4 className="py-4">Done</h4>
                {this.state.tasks}
            </div>
        );
    }
}