import React, { Suspense, useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
//import Container from "~/components/layouts/Container";
import Layout from '../components/Layout';
import { useRouter } from "next/router";
import { NumericFormat } from 'react-number-format';
import { depto, tipodocumento, ciudad, paises } from "../constants/index.js";
import shortid from "shortid";
import axios from "axios";

function Wompi(props) {
    const [habilitarPagar, setHabilitarPagar] = useState(false);
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState(defaultValueForm());
    const [listarPlanes, setListarPlanes] = useState([]);
    const [valPago, setValPago] = useState(0);
    const [valImpuesto, setValImpuesto] = useState(0);
    const [tipoDcto, setTipoDcto] = useState(0);
    const router = useRouter();
    const [tempo, setTempo] = useState(12400000);

    const onChange = e => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const movimientos = async () => {
            await axios({
                method: 'post',
                url: 'https://api.brokerup.co/bu/5002'
            }).then(rest => {
                if (rest) {
                    console.log("RETORNA : ", rest.data);
                    setListarPlanes(rest.data);
                }
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO PLANES");
            })
        };
        movimientos();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        //console.log("DATOS FORM : ", formData);
        setHabilitarPagar(true);

        /*
       return
       setFormError({});
       let errors = {};
       let formOk = true;

       if (!formData.nombres) {
           errors.nombres = true;
           formOk = false;
       }

      
           if (!validateEmail(formData.email)) {
             errors.email = true;
             formOk = false;
           }
   
           if (formData.password.length < 6) {
             errors.password = true;
             formOk = false;
           }
           

       setFormError(errors);

       if (formOk) {
           setIsLoading(true);
           console.log(formData.email);
           console.log(formData.password);


       }
       */
    }

    const valorimpuesto = (valor) => {
        let validarprecio;
        let sincaracterres = "";

        for (var i = 0; i < valor.length; i++) {
            validarprecio = valor.substr(i, 1);
            if (
                validarprecio != 0 &&
                validarprecio != 1 &&
                validarprecio != 2 &&
                validarprecio != 3 &&
                validarprecio != 4 &&
                validarprecio != 5 &&
                validarprecio != 6 &&
                validarprecio != 7 &&
                validarprecio != 8 &&
                validarprecio != 9
            ) {
                console.log("CARACTER", i, validarprecio);
            } else sincaracterres = sincaracterres + validarprecio;
        }

        let impuesto = (parseInt(sincaracterres) * 19) / 100;
        console.log("VALOR : ", sincaracterres);
        setValPago(sincaracterres);
        setValImpuesto(impuesto);

    }

    return (
        <Layout className="margenwompi">

            <div className="ps-page ps-page--inner">
                <div className="container  margenwompi">
                    <h2 className="centrartexto">PASARELA DE PAGOS</h2>

                    <div className="ml-200 mb-20 form-body tamañoformulariodatoscliente">
                        <form className="container mt-3 mb-3" onChange={onChange}>
                            <Row className="mb-3">
                                <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                                    <Form.Label>Nombres</Form.Label>
                                    <Form.Control
                                        type="name"
                                        name="nombres"
                                        className="form-control" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control
                                        type="name"
                                        name="apellidos"
                                        className="form-control" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                                    <Form.Label>Cedula</Form.Label>
                                    <InputGroup>
                                        <Form.Select
                                            className="form-control"
                                            onChange={(e) => setTipoDcto(e.target.value)}
                                            name="tipodocumento"
                                        >
                                            {tipodocumento &&
                                                tipodocumento.map(
                                                    (item) => {
                                                        return (
                                                            <option value={item.value}>{item.label}</option>
                                                        );
                                                    }
                                                )}
                                        </Form.Select>
                                        <NumericFormat
                                            className="form-control"
                                            name="cedula"
                                            autoComplete="off"
                                            //prefix={'$ '}
                                            thousandSeparator=","
                                        //decimalScale={2}
                                        />

                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                                    <Form.Label>Teléfono</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">+57</InputGroup.Text>
                                        <Form.Control
                                            aria-label="Mobile Number"
                                            type="mobile"
                                            aria-describedby="basic-addon1"
                                            className="form-control"
                                            name="telefono" />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            type="email"
                                            name="email"
                                            placeholder="info@brokerup.com.co"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="direccion"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="formGridState" className="col col-sm-4">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Select
                                        className="form-control"
                                        name="ciudad"
                                    >
                                        {ciudad &&
                                            ciudad.map(
                                                (item) => {
                                                    return (
                                                        <option value={item.value}>{item.label}</option>
                                                    );
                                                }
                                            )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="formGridState" className="col col-sm-4">
                                    <Form.Label>Departamento</Form.Label>
                                    <Form.Select
                                        className="form-control"
                                        name="departamento"
                                    >
                                        {depto &&
                                            depto.map(
                                                (item) => {
                                                    return (
                                                        <option value={item.value}>{item.label}</option>
                                                    );
                                                }
                                            )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="formGridState" className="col col-sm-4">
                                    <Form.Label>Paises</Form.Label>
                                    <Form.Select
                                        className="form-control"
                                        name="pais"
                                    >
                                        {paises &&
                                            paises.map(
                                                (item) => {
                                                    return (
                                                        <option value={item.value}>{item.label}</option>
                                                    );
                                                }
                                            )}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                                    <Form.Label>Valor</Form.Label>

                                    <Form.Select
                                        className="form-control"
                                        name="valorpago"
                                        prefix={'$ '}
                                        onChange={(e) => valorimpuesto(e.target.value)}
                                        thousandSeparator=","
                                    >
                                        {listarPlanes &&
                                            listarPlanes.map(
                                                (item) => {
                                                    return (
                                                        <option value={item.tip_valor}>{item.tip_nombre}</option>
                                                    );
                                                }
                                            )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                                    <Form.Label>Impuesto</Form.Label>
                                    <NumericFormat
                                        className="form-control"
                                        disabled={true}
                                        name="valoriva"
                                        value={valImpuesto}
                                        prefix={'$ '}
                                        thousandSeparator=","
                                    //decimalScale={2}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="formGridlabel" className="col col-sm-12">
                                    <Form.Label>Comentarios</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="{3}"
                                        className="form-control"
                                        name="comentarios"
                                        placeholder="Información adicional relacionada con el pago"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 mt-40">
                                <Col xs={2} md={3} sm={6} lg={6}>
                                    <button
                                        //type="submit"
                                        onClick={(e) => onSubmit(e)}
                                        className="botonconfirmar"
                                    >
                                        Validar datos
                                    </button>
                                </Col>
                                <Col xs={2} md={3} sm={6} lg={6}>
                                    <button
                                        type="reset"
                                        onClick="{resetButton}"
                                        className="botonconcancelar"
                                    >
                                        Cancelar
                                    </button>
                                </Col>
                            </Row>
                        </form>
                        {
                            habilitarPagar ?
                                <Pagar valPago={parseInt(valPago)} valImpuesto={parseInt(valImpuesto)} formData={formData} />
                                :
                                null
                        }
                        {
                            console.log("ENVIAR VALOR : ", valPago)
                        }
                    </div>
                </div>
            </div>
        </Layout >
    );
}

function defaultValueForm() {
    return {
        nombres: "",
        apellidos: "",
        telefono: "",
        email: "",
        tipodocumento: "",
        cedula: "",
        ciudad: "",
        departamento: "",
        comentarios: "",
        pais: "",
        region: "",
        direccion: "",
        valorpago: "",
        valoriva: ""
    }
}


function Pagar(props) {
    const {
        valPago, valImpuesto, formData
    } = props;

    let referencia = shortid();

    console.log("FORM DATA : ", formData)

    const regresar = () => {
        alert("REGRESAR")
        //setShowModal(false);
        //router.push("/");
    }
    /*
value="pub_test_aT7zNLXdesTjtmi5uMUhrHIAUV9ia5sn"
    */

    return (
        <div className="ps-page ps-page--inner">
            <form className="ml-200" action="https://checkout.wompi.co/p/" method="GET">
                <input type="hidden" name="public-key" value="pub_test_IlNf1qh2OQB9NeFZ4MPXqEKKdquEcgiP" />
                <input type="hidden" name="currency" value="COP" />
                <input type="hidden" name="amount-in-cents" value={valPago + "00"} />
                <input type="hidden" name="reference" value={referencia} />
                <input type="hidden" name="redirect-url" value="https://transaction-redirect.wompi.co/check" />
                <input type="hidden" name="tax-in-cents:vat" value={valImpuesto + "00"} />
                <input type="hidden" name="tax-in-cents:consumption" value={valImpuesto + "00"} />
                <input type="hidden" name="customer-data:email" value={formData.email} />
                <input type="hidden" name="customer-data:full-name" value={formData.nombres + " " + formData.apellidos} />
                <input type="hidden" name="customer-data:phone-number" value={"+573155337803"} />
                <input type="hidden" name="customer-data:legal-id" value={formData.cedula} />
                <input type="hidden" name="customer-data:legal-id-type" value="CC" />
                <input type="hidden" name="shipping-address:address-line-1" value="Cra 30 # 72 sur 02 La Doctora" />
                <input type="hidden" name="shipping-address:country" value="CO" />
                <input type="hidden" name="shipping-address:phone-number" value={"+573155337803"} />
                <input type="hidden" name="shipping-address:city" value="Sabaneta" />
                <input type="hidden" name="shipping-address:region" value="Antioquia" />
                <Row >
                    <Col xs={2} md={3} sm={6} lg={6}>
                        <Button className="botonpasarela" type="submit">Pagar con Wompi</Button>
                    </Col>
                    <Col xs={2} md={3} sm={6} lg={6}>
                        <Button className="botonpasarela" onClick={regresar} >Regresar a Broker Up</Button>
                    </Col>
                </Row>
            </form>
        </div>

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