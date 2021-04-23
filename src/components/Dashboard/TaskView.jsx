import React from "react";
import s from "./Task.module.css";
import {Link} from "react-router-dom";
import {ResultContext} from "./Dashboard";
import {host} from "../../config";
import {Redirect} from "react-router";



class EditTaskInput extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.handlerInput = this.handlerInput.bind(this);
        this.submitCancel = this.submitCancel.bind(this);
        this.submitSave = this.submitSave.bind(this);
        this.state = {
            editTask: `${this.props.parent}`
        }
    }

    handlerInput(event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log(this.state.editTask);
        this.setState({
            [name]: value
        });
        this.setState({
            editTask: value
        })
    }

    submitCancel() {
        return <Redirect to="/dashboard"/>;
    }

    submitSave(event) {
        event.preventDefault();
        // console.log("Сохнанить");
        // console.log(this.state.id);
        const formData = new FormData();
        formData.append("id", this.props.id);
        formData.append("text", this.state.editTask);
        fetch(host+"/changeTask", {
            method: "POST",
            body: formData,
            credentials: 'include'
        }).then(response => response.json())
            .then(result => {
                console.log(this.state.editTask);
            })
    }

    render() {
        return (
            <form>
                <textarea
                    onChange={this.handlerInput}
                    value={this.state.editTask}
                    name="text" rows="8"
                    className="form-control mb-4"
                    placeholder="Новый текст задачи"/>
                <input onClick={this.submitCancel} type="submit"
                       className="btn btn-outline-primary me-2" value="Отменить"/>
                <input onClick={this.submitSave} type="submit"
                       className="btn btn-outline-success" value="Сохранить"/>
            </form>
        );
    }
}





export class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.submitDone = this.submitDone.bind(this);
        this.submitTesting = this.submitTesting.bind(this);
        this.submitProgress = this.submitProgress.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.submitRemove = this.submitRemove.bind(this);
        this.updateText = this.updateText.bind(this);
        this.state = {
            id: "",
            title: "",
            text: "",
            date_added: "",
            status: "",
        }
    }

    updateText() {
        this.setState({
            text: <EditTaskInput parent={this.state.text} id={this.state.id}/>
        })
    }

    changeCategory(event, statusId) {
        event.preventDefault();
        const formData = new FormData;
        formData.append("statusId", statusId);
        formData.append("id", this.state.id)
        fetch(host+"/changeStatus", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                console.log(result);
            })
    }

    submitRemove(event) {
        event.preventDefault();
        const formData = new FormData;
        formData.append("id", this.state.id);
        fetch(host+"/removeTask", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                console.log("remove");
            })
    }

    submitProgress(event) {
        const statusId = ResultContext.Provider.find(item => item.value === "in process").id;
        this.changeCategory(event, statusId);
    }

    submitTesting(event) {
        const statusId = ResultContext.Provider.find(item => item.value === "testing").id;
        this.changeCategory(event, statusId);
    }

    submitDone(event) {
        const statusId = ResultContext.Provider.find(item => item.value === "done").id;
        this.changeCategory(event, statusId);
    }

    componentDidMount() {
        const formData = new FormData;
        formData.append("id", this.props.match.params.id);
        fetch(host+"/getIdTask", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                const parser = new DOMParser();
                const html = parser.parseFromString(result.text, "text/html");
                const date = new Date(result.date_added);
                this.setState({
                    id: result.id,
                    title: result.title,
                    text: html.body.innerText,
                    date_added: date.toLocaleDateString(),
                    status: result.status
                })

            })
    }

    render() {
        return (
            <div className="container">
                <div className={s.modal}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header row m-3">
                                <div className="col-auto mb-3">
                                    <h5 className="modal-title" id="staticBackdropLabel">{this.state.title}</h5>
                                </div>
                                <div className="col-auto mb-3">
                                    <Link to="/dashboard" className="btn-close"/>
                                </div>
                                <div className="navbar navbar-expand-lg navbar-light">
                                    <div className="container-fluid p-0">
                                        <button className="navbar-toggler mb-3" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#navbarText" aria-controls="navbarText"
                                                aria-expanded="false"
                                                aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"/>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbarText">
                                            <div className="d-grid gap-2 d-lg-flex">
                                                <input onClick={this.updateText} type="submit"
                                                       className="btn btn-outline-primary" value="Редактировать"/>
                                                <input onClick={this.submitRemove} type="submit"
                                                       className="btn btn-outline-danger" value="Удалить"/>
                                            </div>
                                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"/>
                                            <div className="d-grid gap-2 d-lg-flex">
                                                <input onClick={this.submitProgress} type="submit"
                                                       className="btn btn-outline-primary text-nowrap"
                                                       value="Начать выполнение"/>
                                                <input onClick={this.submitTesting} type="submit"
                                                       className="btn btn-outline-primary" value="Тестировать"/>
                                                <input onClick={this.submitDone} type="submit"
                                                       className="btn btn-outline-success" value="Выполнено"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body m-3">
                                <div className="px-5">
                                    <div>{this.state.text}</div>
                                </div>
                            </div>
                            <div className="modal-footer me-3">
                                <p>Создано: {this.state.date_added}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}