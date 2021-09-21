import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Button, Row, Col } from "react-bootstrap";
import { BookService, ReportService } from "../../redux/services";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from "../Loading";
import { useBeforeunload } from 'react-beforeunload';
import { useTranslation } from "react-i18next";

export default function BookReadModal({ book, listen, cancel, speak, voices, ...dist }) {
    const { t } = useTranslation();
    const [errMessage, setErrMessage] = useState(null);

    const [page, setPage] = useState(null);
    const [pages, setPages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [isReadingRequest, setIsReadingRequest] = useState(false);

    const activePage = pages.length ? pages.find((i, k) => (k + 1) === page) : null

    const isPrevPageDisabled = page < 2 ? true : false;
    const isNextPageDisabled = pages.length > page ? false : true;

    const isInside = activePage && activePage.text_inside_image;


    const ActivePageContent = () => {
        return (
            <div className={"d-flex w-100 h-100 z-50 top-0 left-0 p-3 " + (isInside ? "position-absolute" : "")}
                style={
                    activePage.content_position === 1 ? {
                        alignItems: "center",
                        justifyContent: "center",
                    } :
                        activePage.content_position === 0 ? {
                            alignItems: "flex-start",
                            justifyContent: "center",
                        } :
                            activePage.content_position === 2 ? {
                                alignItems: "flex-end",
                                justifyContent: "center",
                            } : {}}>
                <div style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "4px 12px",
                    color: "white",
                    fontSize: activePage.content.length < 50 ? 24 : 18,
                    borderRadius: 8,
                    width: !isInside && "100%",
                    textAlign: "center",
                }}>
                    {activePage.content}
                </div>
            </div>
        )
    }

    useEffect(() => {
        setPage(null)
    }, [listen])  // eslint-disable-line react-hooks/exhaustive-deps

    const play = () => {
        if (activePage) {
            let voice = voices.find(x => x.lang === book.language_code) || voices[0];
            speak({
                text: activePage.content,
                voice
            });
        }
    }

    useEffect(() => {
        if (activePage && listen) {
            cancel();

            setTimeout(function () {
                play(activePage);
            }, 400)
        }
    }, [activePage])  // eslint-disable-line react-hooks/exhaustive-deps

    useBeforeunload((event) => {
        cancel();
    });

    const readingHistoryAddRecord = (isFinished = false) => {
        setFetching(true);
        ReportService.readingHistoryAdd({
            data: {
                book: book.id,
                is_finished: isFinished,
            }
        })
            .then()
            .catch()
            .finally(() => {
                setFetching(false);
            });
    }

    return (
        <Modal size={book && (!page ? "sm" : "lg")} onExit={() => cancel()} onShow={() => {
            cancel();
            setFetching(true);
            BookService.pagesByBook(book.id)
                .then((res) => {
                    setPages(res.data)
                    setErrMessage(null)
                })
                .catch((err) => {
                    setErrMessage(err.response)
                })
                .finally(() => setFetching(false))
        }} {...dist}>
            <Loading error={errMessage} fetching={fetching}>
                {activePage ? <>
                    <div className="position-relative" style={{
                        maxHeight: "calc(100vh - 140px)",
                        margin: "0 auto",
                        display: "table",
                        textAlign: "center"
                    }}>
                        {activePage.content_position === 0 ? <ActivePageContent /> : ""}
                        <img src={activePage.image} style={{ maxWidth: "100%", maxHeight: "calc(100vh - 140px)" }} alt="" />
                        {activePage.content_position !== 0 ? <ActivePageContent /> : ""}
                    </div>
                    <div
                        className="position-absolute top-0 left-0 w-100 h-100 d-flex  align-items-center justify-content-between">
                        <Button style={{ opacity: isPrevPageDisabled ? 0.2 : 1 }}
                            variant={isPrevPageDisabled ? "light" : "primary"} onClick={() => {
                                setPage(page - 1);
                                setFetching(true);
                                setTimeout(function () {
                                    setFetching(false);
                                }, 400)
                            }} disabled={isPrevPageDisabled}><FontAwesomeIcon
                                icon={"chevron-left"} /></Button>
                        <Button style={{ opacity: isNextPageDisabled ? 0.2 : 1 }}
                            variant={isNextPageDisabled ? "light" : "primary"} disabled={isNextPageDisabled}
                            onClick={() => {
                                setPage(page + 1);
                                setFetching(true);
                                setTimeout(function () {
                                    setFetching(false);
                                }, 400)
                                if(pages.length === page+1 && !isReadingRequest){
                                    setIsReadingRequest(true);
                                    readingHistoryAddRecord(true);
                                }
                            }}><FontAwesomeIcon icon={"chevron-right"} /></Button>
                    </div>
                    {listen ? <div className="position-relative z-50">
                        <Row className={"mt-3"}>
                            <Col lg={6}>
                                <Button className={"w-100"} variant={"success"} onClick={() => play()}>
                                    <FontAwesomeIcon className={"me-2"} icon={"redo"} />
                                    {t("book.read_listen_modal.listen_again")}
                                </Button>
                            </Col>
                            <Col lg={6}>
                                <Button className={"w-100"} variant={"danger"} onClick={() => cancel()}>
                                    <FontAwesomeIcon className={"me-2"} icon={"stop-circle"} />
                                    {t("book.read_listen_modal.stop")}
                                </Button>
                            </Col>
                        </Row>
                    </div> : null}
                </> : <div className={"position-relative bg-dark "}>
                    <img src={book.cover_image} className={"w-100"} style={{ opacity: 0.25 }} alt="" />
                    <div
                        className="top-0 left-0 fw-bold position-absolute w-100 h-100 justify-content-center align-items-center d-flex h4 mb-0">
                        <Button onClick={() => {
                            setPage(1)
                            setFetching(true);
                            setTimeout(function () {
                                setFetching(false);
                            }, 400)
                            readingHistoryAddRecord();
                        }} size={"lg"}
                            variant={"success"}>{listen ? t("book.read_listen_modal.start_listen") : t("book.read_listen_modal.start_read")}</Button>
                    </div>
                </div>}
            </Loading>
        </Modal>
    );
}
