import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Area from "../components/Area";
import AuthorList from './../components/author/AuthorList';

export default function Authors() {
    const { t } = useTranslation();
    return (
        <Container>
            <Area title={t("book.author.authors")}>
                <AuthorList />
            </Area>
        </Container>
    )
}
