import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import Area from './../components/Area';
import { useSelector } from "react-redux";
import RedirectToHome from "../components/RedirectToHome";
import { useTranslation } from "react-i18next";

const Item = ({ children, icon }) => {
    return (
        <Card className={"text-dark text-center p-3 bg-light"}>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <FontAwesomeIcon className={"mb-2"} size={"2x"} icon={icon} />
                <div className={"text-2xl fw-bold"}>
                    {children}
                    <FontAwesomeIcon className={"ms-2"} icon={"chevron-right"} />
                </div>
            </div>
        </Card>
    )
}

export default function SchoolPage() {
    const auth = useSelector((state) => state.auth)
    const {t} = useTranslation();
    return auth.user && auth.user.user_type === 4 && auth.user.is_principal === true ? (
        <>
            <Container>
                <Area title={t('reports.school_record.my_school')}>
                    <Row>
                        <Col lg={6}>
                            <Link to={"/profile/my-school-reports/reading-history"}>
                                <Item icon={"eye"}>{t('reports.school_record.reading_histories')}</Item>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <Link to={"/profile/my-school-reports/quiz-history"}>
                                <Item icon={"pencil-alt"}>{t('reports.school_record.quiz_histories')}</Item>
                            </Link>
                        </Col>
                    </Row>
                </Area>
            </Container>
        </>
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
