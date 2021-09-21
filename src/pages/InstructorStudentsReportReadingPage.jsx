import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { SchoolService } from "../redux/services";
import Area from '../components/Area';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentReadingHistoryCard from '../components/report/instructor/StudentReadingHistoryCard';
import { setLoading } from "../redux/actions/auth.action";
import { useTranslation } from "react-i18next";
import RedirectToHome from './../components/RedirectToHome';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


export default function InstructorStudentsReportReadingPage() {
    let query = useQuery();
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [classroom, setClassroom] = useState(null);
    const auth = useSelector((state) => state.auth)

    const getChildren = () => {
        dispatch(setLoading(true))
        SchoolService.getClassReadingHistoryByInstructor()
            .then((res) => {
                let _classroom = res.data.find(x => x.id.toString() === query.get('classroom'));
                setClassroom(_classroom)
            })
            .catch()
            .finally(() => {
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        getChildren()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return auth.user && auth.user.user_type === 4 ? (classroom ? (
        <>
            <Container>
                <Area title={classroom.name + ": " + t('reports.student_record.read_history_all')}
                    toolbar={(
                        <Link to={"/profile/classroom/students?classroom=" + classroom.id}>
                            <Button variant={"light"} size={"sm"}>
                                <FontAwesomeIcon className={"me-2"} icon={"chevron-left"} />
                                {t('reports.turn_back')}
                            </Button>
                        </Link>
                    )}>
                    {classroom?.students?.length ? (
                        <div>
                            <div className={"mb-2"}>
                                <div className={"m-n2"}>
                                    <Button className={"m-2"} variant={"success"}>
                                        <FontAwesomeIcon className={"me-2"} icon={"newspaper"} />
                                        {t('reports.student_record.total_read')}: <b>{classroom.total_read_of_class}</b>
                                    </Button>
                                    <Button className={"m-2"} variant={"info"}>
                                        <FontAwesomeIcon className={"me-2"} icon={"clock"} />
                                        {t('reports.student_record.average_read')}: <b>{(classroom.avg_read_book).toFixed(1)}</b>
                                    </Button>
                                </div>
                            </div>
                            <Row className={"my-n2"}>
                                {
                                    classroom.students.map((student, i) => {
                                        return (
                                            <StudentReadingHistoryCard student={student.student} className={"my-2"} key={i}/>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    ) : (
                        <div className={"small text-muted p-3 text-center"}>{t('reports.student_record.student_not_found')}</div>
                    )}
                </Area>
            </Container>
        </>
    ) : null
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
