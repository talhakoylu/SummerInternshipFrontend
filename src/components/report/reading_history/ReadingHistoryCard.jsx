import React from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ReadingHistoryCard({ item, ...dist }) {
    const { t } = useTranslation();
    return (
        <div>
            <Card className={"text-dark"} {...dist}>
                <Link to={"/book/" + item.book.slug}>
                    <div className={"d-flex align-items-center p-2"}>
                        <FontAwesomeIcon className={"me-3 ms-2"} icon={"book"} size={"lg"} />
                        <div style={{ lineHeight: 1.2, flex: 1 }}>
                            <div className={"fw-bold"}>
                                {item.book.name}
                            </div>
                            <small>{item.book.language}</small>
                        </div>
                        <Button variant={"success"} size={"sm"}>{t('reports.reading_history.read_count')}: {item.counter}</Button>
                    </div>
                </Link>
            </Card>
        </div>
    )
}
