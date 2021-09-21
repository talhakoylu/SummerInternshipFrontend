import React from "react";
import { useTranslation } from "react-i18next";
import ReadingHistoryCard from "./ReadingHistoryCard";

export default function ReadingHistoryList({data}) {
    const { t } = useTranslation();
    return data.length ? (
        <div className="my-n2">
            {data.map((item) => {
                return (
                    <ReadingHistoryCard className={"my-2"} item={item} key={item.id}/>
                )
            })}
        </div>
    ) : (
        <div className={"small text-muted p-3 text-center"}>{t('reports.reading_history.reading_history_not_found')}</div>
    )
}
