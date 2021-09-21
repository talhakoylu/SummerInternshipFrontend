import React, { useEffect } from 'react';
import { Alert, Badge, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setBookLanguages } from '../../redux/actions/auth.action';
import { BookService } from "../../redux/services";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function BookLanguages() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [fetching, setFetching] = useState(false);
    const languages = useSelector((state) => state.auth.bookLanguages)

    useEffect(() => {
        setFetching(true);
        BookService.languageList()
            .then((res) => {
                dispatch(setBookLanguages(res.data));
            })
            .catch()
            .finally(() => {
                setFetching(false);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Card>
            <Card.Header><div className="my-2">{t("book.languages")}</div></Card.Header>
            {fetching ? (<Alert variant="secondary">{t("loading")}</Alert>) : (
                languages.length ?
                    <div className="scroll">
                        <ListGroup variant="flush">
                            {languages.map((language) => {
                                return (
                                    <Link key={language.language_name} to={"/books?language=" + language.id}>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    {language.language_name}
                                                </div>
                                                <Badge bg="primary py-2">{language.language_code}</Badge>
                                            </div>

                                        </ListGroup.Item>
                                    </Link>
                                )
                            })}
                        </ListGroup>
                    </div> : <div className={"small text-muted p-3 text-center"}>{t("book.language_not_found")}</div>
            )}
        </Card>
    )
}