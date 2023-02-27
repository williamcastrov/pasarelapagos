import React, { Suspense, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
//import Container from "~/components/layouts/Container";
import Layout from '../components/Layout';
import { useRouter } from "next/router";

function Wompi(props) {
    const [showModal, setShowModal] = useState(true);
    const router = useRouter();

    const regresar = () => {
        setShowModal(false);
        //router.push("/");
    }
    //<input type="hidden" name="redirect-url" value="https://api.aal-estate.com/mrp/api/14" />
    return (
        <Layout className="margenwompi">
            <div className="ps-page ps-page--inner">
                <div className="container  margenwompi">

                    <h2 className="centrartexto">PAGAR A TRAVES DE WOMPI</h2>

                    <div className="ml-600 mb-20 form-body tamañoformulariodatoscliente">
                        <div className="row">
                            <div className="form-holder">
                                <div className="form-content">
                                    <div className="form-items">
                                        <h3>Register Today</h3>
                                        <p>Fill in the data below.</p>
                                        <form className="requires-validation" novalidate>

                                            <div className="col-md-12">
                                                <input className="form-control" type="text" name="name" placeholder="Full Name" required />
                                                <div className="valid-feedback">Username field is valid!</div>
                                                <div className="invalid-feedback">Username field cannot be blank!</div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="ml-200" action="https://checkout.wompi.co/p/" method="GET">
                        <input type="hidden" name="public-key" value="pub_prod_aT7zNLXdesTjtmi5uMUhrHIAUV9ia5sn" />
                        <input type="hidden" name="currency" value="COP" />
                        <input type="hidden" name="amount-in-cents" value="11670000" />
                        <input type="hidden" name="reference" value="37DNKF84S92N1S" />
                        <input type="hidden" name="redirect-url" value="https://transaction-redirect.wompi.co/check" />
                        <input type="hidden" name="tax-in-cents:vat" value="2217300" />
                        <input type="hidden" name="tax-in-cents:consumption" value="116700" />
                        <input type="hidden" name="customer-data:email" value="williamcastrov@gmail.com" />
                        <input type="hidden" name="customer-data:full-name" value="William Castro" />
                        <input type="hidden" name="customer-data:phone-number" value="573155337803" />
                        <input type="hidden" name="customer-data:legal-id" value="79206558" />
                        <input type="hidden" name="customer-data:legal-id-type" value="CC" />
                        <input type="hidden" name="shipping-address:address-line-1" value="Cra 30 # 72 sur 02 La Doctora" />
                        <input type="hidden" name="shipping-address:country" value="CO" />
                        <input type="hidden" name="shipping-address:phone-number" value="573155337803" />
                        <input type="hidden" name="shipping-address:city" value="Sabaneta" />
                        <input type="hidden" name="shipping-address:region" value="Antioquia" />
                        <Row >
                            <Col md={2}>
                            </Col>
                            <Col md={4}>
                                <Button className="botonpasarela" size="lg" type="submit">Pagar con Wompi</Button>
                            </Col>
                            <Col md={4}>
                                <Button className="botonpasarela" onClick={regresar} size="lg">Regresar a Broker Up</Button>
                            </Col>
                        </Row>
                    </form>

                </div>
            </div>
        </Layout >
    );
}

export default Wompi;

/*
<form className="ml-10" action="https://checkout.wompi.co/p/" method="GET">
                        <input type="hidden" name="public-key" value="pub_test_Xnmo3SoUCyyUOwkhsstfScsgLDOnfN2F" />
                        <input type="hidden" name="currency" value="COP" />
                        <input type="hidden" name="amount-in-cents" value="7890000" />
                        <input type="hidden" name="reference" value="37DNKF84S92N11" />
                        <input type="hidden" name="redirect-url" value="https://sitbusiness.co/mrp/api/14" />
                        <input type="hidden" name="tax-in-cents:vat" value="1290000" />
                        <input type="hidden" name="tax-in-cents:consumption" value="590000" />
                        <input type="hidden" name="customer-data:email" value="williamcastrov@gmail.com" />
                        <input type="hidden" name="customer-data:full-name" value="William Castro" />
                        <input type="hidden" name="customer-data:phone-number" value="573155337803" />
                        <input type="hidden" name="customer-data:legal-id" value="79206558" />
                        <input type="hidden" name="customer-data:legal-id-type" value="CC" />
                        <input type="hidden" name="shipping-address:address-line-1" value="Cra 30 # 72 sur 02 La Doctora" />
                        <input type="hidden" name="shipping-address:country" value="CO" />
                        <input type="hidden" name="shipping-address:phone-number" value="573155337803" />
                        <input type="hidden" name="shipping-address:city" value="Sabaneta" />
                        <input type="hidden" name="shipping-address:region" value="Antioquia" />
                        <Row >
                            <Col md={2}>
                            </Col>
                            <Col md={4}>
                                <Button className="botonpasarela" size="lg" type="submit">Pagar con Wompi</Button>
                            </Col>
                            <Col md={4}>
                                <Button className="botonpasarela" onClick={regresar} size="lg">Regresar a Broker Up</Button>
                            </Col>
                        </Row>
                    </form>
*/