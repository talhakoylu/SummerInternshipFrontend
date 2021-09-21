import React, { useEffect, useState } from "react";
import Area from "../components/Area";
import { Card, Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { setFetching } from "../redux/actions/auth.action";
import { BookService } from "../redux/services";
import BookCard from "../components/book/BookCard";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function AuthorDetailPage() {
    const { t } = useTranslation();
    const [author, setAuthor] = useState({});
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFetching(true));
        BookService.authorDetail({ slug: slug })
            .then((res) => {
                setAuthor(res.data)
            })
            .catch(() => {
            })
            .finally(() => {
                dispatch(setFetching(false));
            })
    }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        author.id ? <Container>
            <Area title={author.first_name + " " + author.last_name}>
                <div className={"d-flex"}>
                    <div style={{ minWidth: 150, maxWidth: 150, width: 150}} className={"me-3 "}>
                        <img src={author.photo} alt="" className={"border w-100"} />
                    </div>
                    <div style={{ flex: 1 }} className={"d-flex flex-column mb-3"}>
                        <div style={{ flex: 1 }}>
                            <Card className={"p-3 mb-2"}>
                                <div className={"d-flex align-items-center"}>
                                    <b className={"pe-1"}>{t("book.author.name")}:</b> {author.first_name}
                                </div>
                            </Card>
                            <Card className={"p-3 mb-2"}>
                                <div className={"d-flex align-items-center"}>
                                    <b className={"pe-1"}>{t("book.author.surname")}:</b> {author.last_name}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className={"mt-3"}>
                <Alert variant="success"><strong>{t("book.author.biography")}</strong></Alert>

                    <Card>
                        <Card.Body>{author.biography}</Card.Body>
                    </Card>
                </div>
                <div className={"mt-3"}>
                    <Alert variant="info"><strong>{t("book.author.authors_books")}</strong></Alert>
                    <Row className={"my-n3"}>
                        {
                            author.books.map((book) => {
                                return (
                                    <Col lg={3} key={book.name} className={"my-3"}>
                                        <BookCard book={book} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </Area>
        </Container> : null
    )
}
