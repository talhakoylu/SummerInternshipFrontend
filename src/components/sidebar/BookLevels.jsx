import React, { useEffect } from 'react';
import { Alert, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLevels } from '../../redux/actions/auth.action';
import { BookService } from "../../redux/services";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function BookLevels() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [fetching, setFetching] = useState(false);
    const levels = useSelector((state) => state.auth.levels)
    const lang = useSelector((state) => state.auth.lang)

    useEffect(() => {
        setFetching(true);
        BookService.levelList()
            .then((res) => {
                dispatch(setLevels(res.data));
            })
            .catch()
            .finally(() => {
                setFetching(false);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Card>
            <Card.Header><div className="my-2">{t("book.levels")}</div></Card.Header>
            {fetching ? (<Alert variant="secondary">{t("loading")}</Alert>) : (
                levels.length ?
                    <div className="scroll">
                        <ListGroup variant="flush">
                            {levels.map((level) => {
                                return (
                                    <Link key={level.title} to={"/books?level=" + level.id}>
                                        <ListGroup.Item>{lang === "en" ? level.title_english : level.title}</ListGroup.Item>
                                    </Link>
                                )
                            })}
                        </ListGroup>
                    </div> : <div className={"small text-muted p-3 text-center"}>{t("book.levels_not_found")}</div>
            )}
        </Card>
    )
}