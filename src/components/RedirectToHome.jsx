import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import notification from './../plugins/notification';

export default function RedirectToHome({title, message}){
    useEffect(() => {
        notification.add('info', title, message)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <Redirect to="/" />
    )
}