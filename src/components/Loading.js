import React from "react";
import {Alert} from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Loading({children, error, fetching, size}) {
    const {t} = useTranslation();
    return <div className={"position-relative"} style={{minHeight: fetching && 200}}>
        {fetching ? <div
            className={"position-absolute bg-white w-100 h-100 d-flex justify-content-center align-items-center"}
            style={{zIndex: 20}}>
            <img className={"d-inline-block"} src={"/fetching.svg"} width={size && 100} alt=""/>
        </div> : (
            error ? <Alert variant={"danger"}>{error.data.code ? t("errors.login_token_expired") : error.data.detail || error.data.error}</Alert>: null
        )}
        
        <div style={
            {//eslint-disable-next-line no-mixed-operators
                display: fetching || error && "none" 
                }}>{children}</div>
    </div>;
}
