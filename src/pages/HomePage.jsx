import { Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <section id="introduction" className="section1-bg mt-n4">
                <Container>
                    <div className="row gx-5 align-items-center justify-content-center">
                        <Col lg="8" xl="7" xxl="6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-2">İstediğin türde kitabı seç, özgürce oku</h1>
                                <p className="lead fw-normal mb-4 text-white-50">Çeşitli kategorilerden ve seviyelerden kitabını seç, internetin olduğu her yerde oku.</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <NavLink to={"/books"} className={"btn btn-primary btn-lg px-4 me-sm-3"}>
                                    Okumaya Başla
                                    </NavLink>
                                </div>
                            </div>
                        </Col>
                        <Col xl="5" xxl="6" className="d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src={"/chilling.svg"} alt="..." /></Col>
                    </div>
                </Container>
            </section>
            <section id="information" >
                <Container>
                    <div className="row gx-5 align-items-center justify-content-center">
                        <Col xl="5" xxl="6" className="d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src="/book-info.svg" alt="..." /></Col>
                        <Col lg="8" xl="7" xxl="6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder mb-2">Eğitici ve Eğlenceli Birçok Seçenek!</h1>
                                <p className="lead fw-normal mb-4 ">Eğleneceğin kitapları okurken aynı zamanda yeni şeyler de öğreneceksin. Okuduktan sonra görevin bitmiyor, sınavlar seni bekliyor. Okumanı bitir, sınavını çöz ve ne kadar iyi bir okuyucu olduğunu ölç.</p>

                            </div>
                        </Col>

                    </div>
                </Container>
            </section>
        </>
    )

}