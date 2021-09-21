import React, { useEffect, useState } from "react";
import Area from "../components/Area";
import { Card, OverlayTrigger, Tooltip, Row, Col, Button, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BookService } from "../redux/services";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { setFetching } from "../redux/actions/auth.action";
import BookImage from "../components/book/BookImage";
import { useTranslation } from "react-i18next";
import BookReadModal from './../components/book/BookReadModal';
import QuizModal from './../components/book/QuizModal';
import { useSpeechSynthesis } from 'react-speech-kit';


export default function BookDetail() {
    const { t } = useTranslation();
    const [book, setBook] = useState({});
    let { slug } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const lang = useSelector((state) => state.auth.lang)

    const {speak, cancel, voices} = useSpeechSynthesis();

    useEffect(() => {
        dispatch(setFetching(true));
        BookService.detail({ slug: slug })
            .then((res) => {
                setBook(res.data)
            })
            .catch(() => {
            })
            .finally(() => {
                dispatch(setFetching(false));
            })
    }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

    const [readModalShow, setReadModalShow] = useState(false);
    const [quizModalShow, setQuizModalShow] = useState(false);
    const [listen, setListen] = useState(false);

    const readModalHandleClose = () => setReadModalShow(false);
    const readModalHandleShow = () => setReadModalShow(true);

    const quizModalHandleClose = () => setQuizModalShow(false);
    const quizModalHandleShow = () => setQuizModalShow(true);

    return (
        <Container>
            {book.id ? <Area title={book.name}>
                <BookReadModal cancel={cancel} speak={speak} voices={voices} book={book} show={readModalShow} handleClose={readModalHandleClose} listen={listen} />
                <div className={"d-flex"}>
                    <div style={{ width: 271.98 }} className={"me-3 mb-3"}>
                        <BookImage book={book} />
                    </div>
                    <div style={{ flex: 1 }} className={"d-flex flex-column mb-3"}>
                        <div style={{ flex: 1 }}>
                            {book.author ? <Card className={"p-3 mb-2"}>
                                <div className={"d-flex align-items-center"}>
                                    <b className={"pe-1"}>{t("book.author.author")}:</b>
                                    <Link to={"/author/" + book.author.slug} className={"d-flex align-items-center"}>
                                        <img style={{ width: 28, height: 28, borderRadius: "100%" }} src={book.author.photo} alt={book.author.first_name + " " + book.author.last_name}
                                            className={"border me-1"} />
                                        {book.author.first_name + ' ' + book.author.last_name}
                                    </Link>
                                </div>
                            </Card> : null}
                            <Card className={"p-3 mb-2"}>
                                <div className={"d-flex align-items-center"}>
                                    <b className={"pe-1"}>{t("book.language")}:</b> {book.language}
                                </div>
                            </Card>
                            <Card className={"p-3 mb-2"}>
                                <div className={"d-flex align-items-center"}>
                                    <b className={"pe-1"}>{t("book.category")}:</b> {lang === "en" ? book.category_english : book.category}
                                </div>
                            </Card>
                            <Card className={"p-3 mb-2"}>
                                <div className={"d-flex align-items-center"}>
                                    <b className={"pe-1"}>{t("book.level")}:</b> {lang === "en" ? book.level_english : book.level}
                                </div>
                            </Card>
                        </div>
                        <Row>
                            <Col lg={4}>
                                <OverlayTrigger overlay={user ? <></> : <Tooltip id="tooltip-disabled">{t("errors.login_required")}</Tooltip>}>
                                    <span>
                                        <Button disabled={user ? false : true} className={" w-100"} variant={"success"} onClick={() => {
                                            setListen(false);
                                            readModalHandleShow()
                                        }}>
                                            <FontAwesomeIcon className={"me-2"} icon={"book-reader"} />
                                            {t("book.read")}
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                            </Col>
                            <Col lg={4}>
                                <OverlayTrigger overlay={user ? <></> : <Tooltip id="tooltip-disabled">{t("errors.login_required")}</Tooltip>}>
                                    <span>
                                        <Button disabled={user ? false : true} className={"text-white w-100"} variant={"warning"} onClick={() => {
                                            setListen(true);
                                            readModalHandleShow()
                                        }} >
                                            <FontAwesomeIcon className={"me-2"} icon={"headphones-alt"} />
                                            {t("book.listen")}
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                            </Col>
                            <Col lg={4}>
                                <OverlayTrigger overlay={user ? <></> : <Tooltip id="tooltip-disabled">{t("errors.login_required")}</Tooltip>}>
                                    <span>
                                        <Button disabled={user ? false : true} className={"w-100"} variant={"info"} onClick={() => {
                                            quizModalHandleShow()
                                        }} >
                                            <FontAwesomeIcon className={"me-2"} icon={"file-alt"} />
                                            {t("book.quiz")}
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={"mt-2"}>
                    <Card>
                        <Card.Header><strong>{t("book.introduction")}</strong></Card.Header>
                        <Card.Body>{book.description}</Card.Body>
                    </Card>
                </div>
                <QuizModal cancel={cancel} speak={speak} voices={voices} book={book} show={quizModalShow} handleClose={quizModalHandleClose} backdrop="static" />
            </Area> : null}
        </Container>
    )
}
