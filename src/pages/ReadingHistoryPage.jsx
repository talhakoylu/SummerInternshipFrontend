import React, { useEffect, useState } from "react";
import Area from "../components/Area";
import { BookService } from "../redux/services";
import { setLoading } from "../redux/actions/auth.action";
import { useDispatch, useSelector } from 'react-redux'
import ReadingHistoryList from './../components/report/reading_history/ReadingHistoryList';
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RedirectToHome from "../components/RedirectToHome";

export default function ReadingHistoryPage() {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(setLoading(true))
        BookService.readingHistoryListByChild()
            .then((res) => {
                setData(res.data?.[0]?.books)
            })
            .catch()
            .finally(() => {
                dispatch(setLoading(false))
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return auth.user && auth.user.user_type === 2 ? (
        <Container>
            <Area title={t('reports.reading_history.reading_history_page')}>
                <ReadingHistoryList data={data} />
            </Area>
        </Container>
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
