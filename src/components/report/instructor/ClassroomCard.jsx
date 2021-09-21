import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { notification } from '../../../plugins';
import { SchoolService } from '../../../redux/services';

export default function ClassroomCard({ handleShow, classrooms, setClassroom, setClassrooms, classroom, ...dist }) {
    const { t } = useTranslation();
    return ( 
        <div>
            <Card className={"text-dark"} {...dist}>
                <div className={"d-flex align-items-center p-2"}>
                    <FontAwesomeIcon className={"me-3 ms-2"} icon={"chalkboard-teacher"} size={"lg"} />
                    <div style={{ lineHeight: 1.2, flex: 1 }}>
                        <div className={"fw-bold"}>{t('reports.student_record.classroom')}: {classroom.name} <span><Badge bg="dark" className="ms-2">{t('reports.student_record.grade')}: {classroom.grade}</Badge></span></div>
                        <small>{classroom.school.name}</small>
                    </div>
                    <div className="d-flex mx-n1 align-items-center">
                        <Link to={"/profile/classroom/students?classroom=" + classroom.id}>
                            <Button className={"mx-1"} size={"sm"} variant={"info"}>
                                <FontAwesomeIcon icon={"users"} className={"me-2"} />
                                {t('reports.student_record.students')}
                            </Button>
                        </Link>
                        <Button className={"mx-1"} size={"sm"} variant={"success"} onClick={() => {
                            setClassroom(classroom);
                            handleShow();
                        }}>
                            <FontAwesomeIcon icon={"pencil-alt"} className={"me-2"} />
                            {t('reports.student_record.edit')}
                        </Button>
                        <Button className={"mx-1"} size={"sm"} variant={"danger"} onClick={() => {
                            SchoolService.classDelete(classroom.id)
                                .then(res => {
                                    setClassrooms(classrooms.filter(x => x.id !== classroom.id))
                                })
                                .catch(err => {
                                    notification.add('danger', t('reports.error'), t('reports.undefined_error'))
                                })
                                .finally(() => {
                                });
                        }}>
                            <FontAwesomeIcon icon={"trash"} className={"me-2"} />
                            {t('reports.student_record.delete')}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}