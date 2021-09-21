import React from "react";

export default function Area({title, children, toolbar}) {
    return (
        <div>
            {title && (
                <div className={"d-flex align-items-end mb-3 border-bottom"}>
                    <div className={"fw-bold h5 mb-2"} style={{flex: 1}}>
                        {title}
                    </div>
                    {toolbar ? <div className={"mb-2"}>{toolbar}</div> : null}
                </div>
            )}
            {children}
        </div>
    );
}