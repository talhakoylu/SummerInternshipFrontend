import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import Area from './../components/Area';
import { AuthService, CountryService, SchoolService } from '../redux/services';
import notification from './../plugins/notification';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/actions/auth.action';
import { Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
    const { t } = useTranslation();
    const auth = useSelector((state) => state.auth)
    const [user, setUser] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isReady, setIsReady] = useState(null);
    const [schools, setSchools] = useState([]);
    const [fetching, setFetching] = useState(false);
    const dispatch = useDispatch();

    const userTypes = {
        2: "user_child",
        3: "user_parent",
        4: "user_instructor",
    };
    const userType = auth?.user ? userTypes[auth?.user?.user_type] : null;

    const cities = user?.[userType]?.district && districts?.length && districts?.find(x => x.id.toString() === user?.[userType]?.district) ? districts.find(x => x.id.toString() === user?.[userType]?.district).district_cities : []; // eslint-disable-line react-hooks/exhaustive-deps

    const onChange = (e) => {
        if (e.target.name.toString().indexOf('.') !== -1) {
            let name = e.target.name.split('.');
            let first = name[0];
            let last = name[1];

            setUser({
                ...user,
                [first]: {
                    ...user[first],
                    [last]: e.target.value,
                },
            })
        } else {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            })
        }
    }

    const getDistricts = (country) => {
        return CountryService.detail(country)
    }

    useEffect(() => {
        async function init() {
            dispatch(setLoading(true));
            await CountryService.list()
                .then(res => {
                    dispatch(setCountries(res.data));
                })
                .catch(err => {
                })
                .finally(() => {
                });

            if (auth.user?.user_type === 1) {
            } else if (auth.user?.user_type === 2) {
                await AuthService.getChildProfile(user)
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch(() => {
                    })
                    .finally(() => {
                        setIsReady(true);
                    })
            } else if (auth.user?.user_type === 3) {
                await AuthService.getParentProfile(user)
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch(() => {
                    })
                    .finally(() => {
                        setIsReady(true);
                    })
            } else if (auth.user?.user_type === 4) {
                await AuthService.getInstructorProfile(user)
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch(() => {
                    })
                    .finally(() => {
                        setIsReady(true);
                    })
                await SchoolService.list()
                    .then((res) => {
                        setSchools(res.data);
                    })
                    .catch(() => {
                    })
                    .finally(() => {
                        setIsReady(true);
                    })
            }
            dispatch(setLoading(false));
        }

        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (user?.[userType]?.country) {
            getDistricts(user?.[userType].country)
                .then(res => {
                    let district = res.data.districts.find(x => x.id.toString() === user?.[userType]?.district);
                    if (!district) {
                        setUser({
                            ...user,
                            [userType]: {
                                ...user?.[userType],
                                district: "",
                                city: "",
                            },
                        })
                    } else {
                        if (!district.district_cities.find(x => x.id === user?.[userType]?.city)) {
                            setUser({
                                ...user,
                                [userType]: {
                                    ...user?.[userType],
                                    city: "",
                                },
                            })
                        }
                    }
                    dispatch(setDistricts(res.data.districts));
                })
                .catch(err => {
                })
                .finally(() => {
                });
        } else {
            setDistricts([]);
        }
    }, [user?.[userType]?.country]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = (e, b) => {
        e.preventDefault();

        setFetching(true);

        if (auth.user?.user_type === 1) {
        } else if (auth.user?.user_type === 2) {
            AuthService.childProfileUpdate(user)
                .then(() => {
                    notification.add('success', '', t('account.profile_update.update_success'))
                    if (!user?.[userType].city) {
                        onChange({
                            target: {
                                name: userType + ".country",
                                value: ""
                            }
                        })
                    }
                })
                .catch((err) => {
                    for (var key in err.response.data) {
                        if (key !== "status_code") {
                            err.response.data[key].forEach(element => {
                                notification.add('danger', t('account.profile_update.error'), element)
                            });
                        }
                    }

                })
                .finally(() => {
                    setFetching(false);
                })
        } else if (auth.user?.user_type === 3) {
            AuthService.parentProfileUpdate(user)
                .then(() => {
                    notification.add('success', '', t('account.profile_update.update_success'));
                })
                .catch((err) => {
                    for (var key in err.response.data) {
                        if (key !== "status_code") {
                            err.response.data[key].forEach(element => {
                                notification.add('danger', t('account.profile_update.error'), element)
                            });
                        }
                    }

                })
                .finally(() => {
                    setFetching(false);
                })
        } else if (auth.user?.user_type === 4) {
            AuthService.instructorProfileUpdate(user)
                .then(() => {
                    notification.add('success', '', t('account.profile_update.update_success'))
                })
                .catch((err) => {
                    for (var key in err.response.data) {
                        if (key !== "status_code") {
                            err.response.data[key].forEach(element => {
                                notification.add('danger', t('account.profile_update.error'), element)
                            });
                        }
                    }

                })
                .finally(() => {
                    setFetching(false);
                })
        }
    }

    return !auth.user || auth.user.user_type === 1 ? (<Redirect to="/"></Redirect>) : isReady && auth.user && (
        <Container>
            <Area title={t('account.profile_update.my_profile')}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label></Form.Label>
                        <Button>{t('account.profile_update.user_type')}: {auth.user?.user_type_value}</Button>
                    </Form.Group>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t('account.profile_update.name')}</Form.Label>
                                <Form.Control type="text" name={"first_name"} value={user.first_name} onChange={onChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t('account.profile_update.surname')}</Form.Label>
                                <Form.Control type="text" name={"last_name"} value={user.last_name} onChange={onChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t('account.profile_update.email')}</Form.Label>
                                <Form.Control type="email" name={"email"} value={user.email} onChange={onChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t('account.profile_update.identity_number')}</Form.Label>
                                <Form.Control type="text" name={"identity_number"} value={user.identity_number}
                                    onChange={onChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t('account.profile_update.gender')}</Form.Label>
                                <Form.Select name={"gender"} defaultValue={auth.user.gender} onChange={onChange}>
                                    <option value={1}>{t('account.profile_update.gender_male')}</option>
                                    <option value={2}>{t('account.profile_update.gender_female')}</option>
                                    <option value={3}>{t('account.profile_update.gender_other')}</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t('account.profile_update.birth_date')}</Form.Label>
                                <Form.Control type="date" name={"birth_date"} value={user.birth_date} onChange={onChange} />
                            </Form.Group>
                        </Col>
                        {auth.user?.user_type === 2 || auth.user?.user_type === 3 ? (
                            <>
                                <Col lg={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('account.profile_update.country')}</Form.Label>
                                        <Form.Select name={userType + ".country"} value={user?.[userType]?.country}
                                            defaultValue={user?.[userType]?.country || ""}
                                            onChange={onChange}>
                                            <option value={""}>{t('account.profile_update.country_select')}</option>
                                            {countries.length ? countries.map((country) => {
                                                return (
                                                    <option value={country.code} key={country.code}>{country.name}</option>
                                                )
                                            }) : null}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col lg={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('account.profile_update.district')}</Form.Label>
                                        <Form.Select name={userType + ".district"} value={user?.[userType]?.district}
                                            defaultValue={user?.[userType]?.district || ""}
                                            onChange={onChange}>
                                            <option value={""}>{t('account.profile_update.district_select')}</option>
                                            {districts.length ? districts.map((district) => {
                                                return (
                                                    <option value={district.id} key={district.id}>{district.name}</option>
                                                )
                                            }) : null}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col lg={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('account.profile_update.city')}</Form.Label>
                                        <Form.Select name={userType + ".city"} value={user?.[userType]?.city}
                                            defaultValue={user?.[userType]?.city || ""}
                                            onChange={onChange}>
                                            <option value={""}>{t('account.profile_update.city_select')}</option>
                                            {cities.length ? cities.map((city) => {
                                                return (
                                                    <option value={city.id} key={city.id}>{city.name}</option>
                                                )
                                            }) : null}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </>
                        ) : null}
                        {auth.user?.user_type === 2 ? (
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t('account.profile_update.hobbies')}</Form.Label>
                                    <Form.Control type="text" name={userType + ".hobbies"}
                                        value={user?.[userType].hobbies}
                                        onChange={onChange} />
                                </Form.Group>
                            </Col>
                        ) : null}
                        {auth.user?.user_type === 3 ? (
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t('account.profile_update.profession')}</Form.Label>
                                    <Form.Control type="text" name={userType + ".profession"}
                                        value={user?.[userType].profession}
                                        onChange={onChange} />
                                </Form.Group>
                            </Col>
                        ) : null}
                        {auth.user?.user_type === 4 ? (
                            <>
                                <Col lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('account.profile_update.school')}</Form.Label>
                                        <Form.Select name={userType + ".school"} value={user?.[userType]?.school}
                                            defaultValue={user?.[userType]?.school || ""}
                                            onChange={onChange}>
                                            <option value={""}>{t('account.profile_update.school_select')}</option>
                                            {schools.length ? schools.map((school) => {
                                                return (
                                                    <option value={school.id} key={school.id}>{school.name}</option>
                                                )
                                            }) : null}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('account.profile_update.branch')}</Form.Label>
                                        <Form.Control type="text" name={userType + ".branch"}
                                            required
                                            value={user?.[userType].branch}
                                            onChange={onChange} />
                                    </Form.Group>
                                </Col>
                            </>
                        ) : null}
                    </Row>
                    <Button type={"submit"} className={"w-100"} disabled={fetching}>{t('account.profile_update.update')}</Button>
                </Form>
            </Area>
        </Container>
    )
}
