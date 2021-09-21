import React from 'react';
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Area from './../components/Area';
import BookList from './../components/book/BookList';

/**
 * A function that created to get the url params
 * @returns url parameters.
 */
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

/**
 * A function created to return a list of books and output HTML.
 * @returns HTML output.
 */

export default function BooksPage() {
    const { t } = useTranslation();
    let query = useQuery();
    const categories = useSelector((state) => state.auth.categories);
    const category = categories.find(x => x.id.toString() === query.get('category'));
    const bookLanguages = useSelector((state) => state.auth.bookLanguages);
    const bookLanguage = bookLanguages.find(x => x.id.toString() === query.get('language'));
    const levels = useSelector((state) => state.auth.levels);
    const level = levels.find(x => x.id.toString() === query.get('level'));

    return (
        <Area title={t("book.books")}>
            <div className={"mb-3"}>
                {category ? <Badge bg={"primary"}>{t("book.category")}: {category.title}</Badge> : null}
                {level ? <Badge bg={"primary"}>{t("book.level")}: {level.title}</Badge> : null}
                {bookLanguage ? <Badge bg={"primary"}>{t("book.language")}: {bookLanguage.language_name}</Badge> : null}
            </div>
            <BookList query={{
                category: category ? category.id : null,
                level: level ? level.id : null,
                language: bookLanguage ? bookLanguage.id : null,
            }} />
        </Area>
    )
}