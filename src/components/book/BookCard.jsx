import React from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BookImage from "./BookImage";

export default function BookCard({ book }) {
    const { t } = useTranslation();
    return (
        <Link to={"/book/" + book.slug}>
            <Card>
                <Card.Header>{book.name}</Card.Header>
                <Card.Body>
                    <div className={"mb-3"}>
                        <BookImage book={book} buttons />
                    </div>
                    <Button className={"w-100"} variant={"primary"}>{t("book.details")}</Button>
                </Card.Body>
            </Card>
        </Link>
    )
}