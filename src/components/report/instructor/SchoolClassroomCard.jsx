import React from "react";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function SchoolClassroomCard({children, school, handleShow, classrooms, setClassroom, fetchData, classroom, toolbar, ...dist}) {
    let _school = school || classroom?.school;

    return (
        <Card className={"text-dark"} {...dist}>
            <div className={"d-flex align-items-center p-2"}>
                <FontAwesomeIcon className={"me-3 ms-2"} icon={"chalkboard-teacher"} size={"lg"}/>
                <div style={{lineHeight: 1.2, flex: 1}}>
                    <div className={"fw-bold"}>{classroom.name}</div>
                    <small>{_school.name}</small>
                </div>
                <div className="d-flex mx-n1 align-items-center">
                    {toolbar}
                </div>
            </div>
            {children}
        </Card>
    )
}
