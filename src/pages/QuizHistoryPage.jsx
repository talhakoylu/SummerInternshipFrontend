import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux'
import { notification } from "../plugins";
import { setLoading } from "../redux/actions/auth.action";
import { QuizService } from "../redux/services";
import Area from './../components/Area';
import QuizHistoryList from './../components/report/quiz_history/QuizHistoryList';
import RedirectToHome from './../components/RedirectToHome';
import { useSelector } from 'react-redux';

export default function QuizHistoryPage() {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const dispatch = useDispatch()

    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(setLoading(true))
        QuizService.getQuizHistoryByChild()
            .then((res) => {
                setData(res.data)
            })
            .catch(() => {
                notification.add('danger', t("reports.error"), t("reports.undefined_error"))
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return auth.user && auth.user.user_type === 2 ? (
        <Container>
            <Area title={t("reports.quiz_history.quiz_history_page")}>
                <QuizHistoryList data={data} />
            </Area>
        </Container>
    ) : <RedirectToHome title={t('errors.error')} message={t('errors.permission_error')}></RedirectToHome>
}
