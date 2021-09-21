import React from "react";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BookService } from "../../redux/services";
import AuthorCard from './AuthorCard';
import { setLoading } from './../../redux/actions/auth.action';
import { useTranslation } from "react-i18next";

export default function AuthorList() {
    const dispatch = useDispatch()
    const [authors, setAuthors] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(setLoading(true))
        BookService.authorList()
            .then((res) => {
                setAuthors(res.data)
            })
            .catch()
            .finally(() => {
                dispatch(setLoading(false))
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return authors.length ? (
        <Row className={"my-n2"}>
            {
                authors.map((author,i) => {
                    return (
                        <AuthorCard author={author} className={"my-2"} key={i}/>
                    )
                })
            }
        </Row>
    ) : (
        <div className={"small text-muted p-3 text-center"}>{t("book.author.author_not_found")}</div>
    )
}