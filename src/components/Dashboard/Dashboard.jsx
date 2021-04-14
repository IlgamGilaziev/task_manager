import React from "react";
import {DashboardSectionToDo} from "./DashboardSectionToDo";
import {DashboardSectionInProgress} from "./DashboardSectionInProgress";
import s from "./Dashboard.module.css";
import {DashboardSectionTesting} from "./DashboardSectionTesting";
import {DashboardSectionDone} from "./DashboardSectionDone";

export class Dashboard extends React.Component {
    render() {
        return(
            <div className="d-flex flex-wrap px-5 mb-5">
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <DashboardSectionToDo/>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <DashboardSectionInProgress/>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <DashboardSectionTesting/>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <DashboardSectionDone/>
                </div>
            </div>
        );
    }
}