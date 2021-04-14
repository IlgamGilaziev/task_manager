import React from "react";
import s from "./Task.module.css";
import {Link} from "react-router-dom";


export class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            text: "",
            date_added: ""
        }
    }

    componentDidMount() {
        const formData = new FormData;
        formData.append("id", this.props.match.params.id);
        fetch("http://p9152834.beget.tech/getIdArticle", {
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(result => {
                const date = new Date(result.date_added);
                // date.toLocaleDateString();
                console.log(result);
                this.setState({
                    id: result.id,
                    title: result.title,
                    text: result.text,
                    // date_added: result.date_added
                    date_added: date.toLocaleDateString()
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
                                                <Link className="btn btn-outline-primary" to="#" type="submit">Редактировать</Link>
                                                <Link className="btn btn-outline-danger" to="#" type="submit">Удалить</Link>
                                            </div>
                                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"/>
                                            <div className="d-grid gap-2 d-lg-flex">
                                                <Link className="btn btn-outline-primary text-nowrap" to="#" type="submit">Начать выполнение</Link>
                                                <Link className="btn btn-outline-primary" to="#" type="submit">Тестировать</Link>
                                                <Link className="btn btn-outline-success" to="#" type="submit">Выполнено</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body m-3">
                                <div className="px-5">
                                    <p>{this.state.text}</p>
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