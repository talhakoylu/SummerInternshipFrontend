import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AuthService } from "../../redux/services";
import notification from './../../plugins/notification';
import Modal from './../Modal';

export default function AddChildModal({ getChildren, ...dist }) {
    const { t } = useTranslation();
    const [fetching, setFetching] = useState(null);
    const [identityNumber, setIdentityNumber] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFetching(true);

        AuthService.getChildByIdentity(identityNumber)
            .then(res => {
                AuthService.addChildRecord({
                    child: res.data.id
                })
                    .then(res => {
                        setIdentityNumber(null);
                        dist.handleClose();
                        getChildren()
                    })
                    .catch(err => {
                        if (err?.response?.data?.child) {
                            for (const [key, value] of Object.entries(err.response.data.child)) { // eslint-disable-line no-unused-vars
                                notification.add('danger', t('reports.error'), `${value}`)
                            }
                        } else {
                            notification.add('danger', t('reports.error'),t('reports.undefined_error'))
                        }
                    })
                    .finally(() => {
                        setFetching(false);
                    });
            })
            .catch(err => {
                notification.add('warning', t('reports.error'), t('reports.child_record.no_child_found'))
                setFetching(false);
            })
            .finally(() => {
            });
    }

    return (
        <Modal title={t('reports.child_record.add_child')} {...dist}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>{t('reports.child_record.identity_number')}</Form.Label>
                    <Form.Control type="text" onChange={(e) => setIdentityNumber(e.target.value)}/>
                </Form.Group>

                <Button type={"submit"} disabled={fetching ? true : false} variant="primary" className={"w-100"}>
                    {t('reports.child_record.save')}
                </Button>
            </Form>
        </Modal>
    );
}
