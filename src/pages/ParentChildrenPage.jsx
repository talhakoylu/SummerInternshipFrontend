import React, { useEffect, useState } from "react";
import Area from "../components/Area";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { AuthService } from "../redux/services";
import { setLoading } from "../redux/actions/auth.action";
import { useTranslation } from 'react-i18next';
import ChildCard from './../components/report/ChildCard';
import ReadingHistoryModal from './../components/report/reading_history/ReadingHistoryModal';
import AddChildModal from './../components/report/AddChildModal';
import RedirectToHome from "../components/RedirectToHome";
import QuizHistoryModal from './../components/report/quiz_history/QuizHistoryModal';


export default function ParentChildrenPage() {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const auth = useSelector((state) => state.auth)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [readingHistoryShow, readingHistorySetShow] = useState(false);
    const readingHistoryHandleClose = () => readingHistorySetShow(false);
    const readingHistoryHandleShow = () => readingHistorySetShow(true);
    const [quizHistoryShow, quizHistorySetShow] = useState(false);
    const quizHistoryHandleClose = () => quizHistorySetShow(false);
    const quizHistoryHandleShow = () => quizHistorySetShow(true);

    const dispatch = useDispatch()
    const [children, setChildren] = useState([]);

    const getChildren = () => {
        dispatch(setLoading(true))
        AuthService.childList()
            .then((res) => {
                setChildren(res.data.children)
            })
            .catch()
            .finally(() => {
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        getChildren()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return auth.user && auth.user.user_type === 3 ? (
        <>
            <Container>
                <Area title={t('reports.my_children_page')}
                    toolbar={<Button size={"sm"} onClick={() => handleShow()}>{t('reports.child_record.add_child')}</Button>}>
                    {children.length ? (
                        <Row className={"my-n2"}>
                            {
                                children.map((child) => {
                                    return (
                                        <ChildCard quizHistoryHandleShow={quizHistoryHandleShow}
                                            deleteService={() => AuthService.destroyChildRecord(child.child.user.id)}
                                            readingHistoryHandleShow={readingHistoryHandleShow} setUser={setUser}
                                            children={children} setChildren={setChildren} child={child}
                                            className={"my-2"} key={child.id} />
                                    )
                                })
                            }
                        </Row>
                    ) : (
                        <div className={"small text-muted p-3 text-center"}>{t('reports.child_record.no_child_record_found')}</div>
                    )}
                </Area>
                <ReadingHistoryModal user={user} getChildren={getChildren} show={readingHistoryShow}
                    handleClose={readingHistoryHandleClose} />
                <QuizHistoryModal user={user} getChildren={getChildren} show={quizHistoryShow}
                    handleClose={quizHistoryHandleClose} />
                <AddChildModal getChildren={getChildren} show={show} handleClose={handleClose} />
            </Container>
        </>
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
