import React, { useEffect, useState } from "react";
import { setFetching as setGlobalFetching } from "../../redux/actions/auth.action";
import isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from "react-redux";
import { BookService } from '../../redux/services'
import BookCard from "./BookCard";
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function BookList({ query }) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [finished, setFinished] = useState(true);
    const [books, setBooks] = useState([]);
    const [changed, setChanged] = useState(null);

    const categories = useSelector((state) => state.auth.categories);
    const bookLanguages = useSelector((state) => state.auth.bookLanguages);
    const levels = useSelector((state) => state.auth.levels);
    const isReady = levels.length && bookLanguages.length && categories.length;

    useEffect(() => {
        setFinished(isReady ? false : true)
    }, [isReady])

    useEffect(() => {
        if (finished === false) {
            if (!isEqual(query, changed)) {
                setChanged(query);
                dispatch(setGlobalFetching(true))
                BookService.bookList(query)
                    .then((res) => {
                        setBooks(res.data)
                    })
                    .catch(() => {
                    })
                    .finally(() => {

                        dispatch(setGlobalFetching(false))
                    })
            }
        }
    }, [query, finished]); // eslint-disable-line react-hooks/exhaustive-deps

    return !finished ? (books.length ? (
        <Row className={"my-n3"}>
            {
                books.map((book, i) => {
                    return (
                        <Col lg={4} className={"my-3"} key={i}>
                            <BookCard book={book} />
                        </Col>
                    )
                })
            }
        </Row>
    ) : (
        <div className={"small text-muted p-3 text-center"}>{t("book.book_not_found")}</div>
    )) : (
        <div>{t("loading")}</div>
    )
}