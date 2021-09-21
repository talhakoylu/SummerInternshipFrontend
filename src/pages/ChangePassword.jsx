import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Area from "../components/Area";
import { useSelector } from 'react-redux'
import { AuthService } from "../redux/services";
import { notification } from "../plugins";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
    const { t } = useTranslation();
    const auth = useSelector((state) => state.auth)
    const initialValues = {
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    };
    const [form, setForm] = useState(initialValues);
    const [fetching, setFetching] = useState(false);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.new_password !== form.new_password_confirmation) {
            notification.add('danger', t("account.profile_update.error"), t("account.profile_update.change_password.password_confirm_error"))
        } else {
            setFetching(true);
            AuthService.updatePassword(form)
                .then(() => {
                    notification.add('success', t('account.profile_update.success'), t("account.profile_update.change_password.change_success"));
                    setForm(initialValues);
                })
                .catch((err) => {
                    for (const [key, value] of Object.entries(err.response.data)) { // eslint-disable-line no-unused-vars
                        notification.add('danger', t("account.profile_update.error"), `${value}`)
                    }
                })
                .finally(() => {
                    setFetching(false);
                })
        }
    }

    return auth.user && (
        <Container>
            <Area title={t('account.password_change_page')}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('account.profile_update.change_password.current_password')}</Form.Label>
                        <Form.Control type="password" name={"old_password"} value={form.old_password} onChange={onChange}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('account.profile_update.change_password.new_password')}</Form.Label>
                        <Form.Control type="password" name={"new_password"} value={form.new_password} onChange={onChange}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('account.profile_update.change_password.new_password_confirm')}</Form.Label>
                        <Form.Control type="password" name={"new_password_confirmation"}
                            value={form.new_password_confirmation} onChange={onChange} required />
                    </Form.Group>
                    <Button type={"submit"} className={"w-100"} disabled={fetching}>{t('account.profile_update.update')}</Button>
                </Form>
            </Area>
        </Container>
    )
}
