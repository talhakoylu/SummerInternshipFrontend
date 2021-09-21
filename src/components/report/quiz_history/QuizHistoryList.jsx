import React from "react";
import { useTranslation } from "react-i18next";
import QuizHistoryCard from './QuizHistoryCard';

export default function QuizHistoryList({ data }) {
    const { t } = useTranslation();
    return data.length ? (
        <div className="my-n2">
            {data.map((item) => {
                return (
                    <QuizHistoryCard className={"my-2"} item={item} key={item.id}/>
                )
            })}
        </div>
    ) : (
        <div className={"small text-muted p-3 text-center"}>{t('reports.quiz_history.quiz_history_not_found')}</div>
    )
}
