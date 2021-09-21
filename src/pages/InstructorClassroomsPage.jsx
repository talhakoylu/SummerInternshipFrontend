import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SchoolService } from "../redux/services";
import Area from './../components/Area';
import { Button, Container, Row } from 'react-bootstrap';
import AddUpdateClassroomModal from './../components/report/AddUpdateClassroomModal';
import { setLoading } from "../redux/actions/auth.action";
import ClassroomCard from './../components/report/instructor/ClassroomCard';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import RedirectToHome from './../components/RedirectToHome';



export default function InstructorClassroomsPage() {
    const { t } = useTranslation();
    const auth = useSelector((state) => state.auth)
    const [classroom, setClassroom] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const [classrooms, setClassrooms] = useState([]);

    const getClassrooms = () => {
        dispatch(setLoading(true))
        SchoolService.classList()
            .then((res) => {
                setClassrooms(res.data)
            })
            .catch()
            .finally(() => {
                dispatch(setLoading(false))
            })
    }

    useLayoutEffect(() => {
        getClassrooms()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return auth.user && auth.user.user_type === 4 ? (
        <>
            <Container>
                <Area title={t('reports.student_record.my_classes')}
                    toolbar={<Button size={"sm"} onClick={() => {
                        setClassroom(null);
                        handleShow()
                    }}>{t('reports.student_record.add_new_classroom')}</Button>}>
                    {classrooms.length ? (
                        <Row className={"my-n2"}>
                            {
                                classrooms.map((classroom,i) => {
                                    return (
                                        <ClassroomCard
                                            setClassroom={setClassroom}
                                            handleShow={handleShow}
                                            classrooms={classrooms} setClassrooms={setClassrooms}
                                            classroom={classroom}
                                            className={"my-2"}
                                            key={i} />
                                    )
                                })
                            }
                        </Row>
                    ) : (
                        <div className={"small text-muted p-3 text-center"}>{t('reports.student_record.class_not_found')}</div>
                    )}
                </Area>
                <AddUpdateClassroomModal classroom={classroom} getClassrooms={getClassrooms} show={show} handleClose={handleClose} />
            </Container>
        </>
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
