import React, { useEffect, useState } from "react";
import { Button, Card, Collapse, Container, Row } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { SchoolService } from "../redux/services";
import { setLoading } from "../redux/actions/auth.action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, } from "react-router-dom";
import StudentQuizHistoryCard from './../components/report/instructor/StudentQuizHistoryCard';
import Area from './../components/Area';
import SchoolClassroomCard from './../components/report/instructor/SchoolClassroomCard';
import { useTranslation } from 'react-i18next';

const SchoolReportsQuizItem = ({ ...dist }) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <div>
            <SchoolClassroomCard
                toolbar={dist?.classroom?.students.length ?
                    <Button className={"mx-1"} size={"sm"} variant={"info"} onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text" aria-expanded={open}>
                        <FontAwesomeIcon icon={"users"} className={"me-2"} />
                        {t('reports.school_record.students')}
                        <FontAwesomeIcon icon={"chevron-down"} className={"ms-2"} />
                    </Button> : <Button className={"mx-1"} size={"sm"} variant={"warning"}>
                        <FontAwesomeIcon icon={"times"} className={"me-2"} />
                        {t('reports.school_record.student_not_found')}
                    </Button>}
                className={"my-2"}
                {...dist}
            >
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Card.Body>
                            <Row className={"my-n2"}>
                                {
                                    dist?.classroom?.students.map((student) => {
                                        return (
                                            <StudentQuizHistoryCard student={student.student} className={"my-2"} key={student.id} />
                                            
                                        )
                                    })
                                }
                            </Row>
                        </Card.Body>
                    </div>
                </Collapse>
            </SchoolClassroomCard>
        </div>
    )
}

export default function SchoolReportsQuizPage() {
    const [classroom, setClassroom] = useState(null); // eslint-disable-line no-unused-vars
    const [show, setShow] = useState(false); // eslint-disable-line no-unused-vars
    const handleClose = () => setShow(false); // eslint-disable-line no-unused-vars
    const handleShow = () => setShow(true);
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const [school, setSchool] = useState([]);

    const fetchData = () => {
        dispatch(setLoading(true))
        SchoolService.getAllClassQuizHistoryByPrincipal()
            .then((res) => {
                setSchool(res.data)
            })
            .catch()
            .finally(() => {
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        fetchData()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Container>
                <Area title={t('reports.school_record.my_school_quiz_history')}
                    toolbar={(
                        <Link to={"/profile/my-school"}>
                            <Button variant={"light"} size={"sm"}>
                                <FontAwesomeIcon className={"me-2"} icon={"chevron-left"} />
                                {t('reports.turn_back')}
                            </Button>
                        </Link>
                    )}>
                    {school?.classes?.length ? (
                        <Row className={"my-n2"}>
                            {
                                school.classes?.map((classroom, i) => {
                                    return (
                                        <SchoolReportsQuizItem
                                            key={i}
                                            school={{
                                                name: school.name
                                            }}
                                            classroom={classroom}
                                            setClassroom={setClassroom}
                                            handleShow={handleShow}
                                            fetchData={fetchData}
                                        />
                                    )
                                })
                            }
                        </Row>
                    ) : (
                        <div className={"small text-muted p-3 text-center"}>{t('reports.instructor_record.class_not_found')}</div>
                    )}
                </Area>
            </Container>
        </>
    )
}
