import React, { Fragment, useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer/lib/react-pdf.browser.cjs";
import axios from "axios";
import Layout from "../components/Layout";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#62B2E5",
        color: "black",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: 800,//window.innerWidth, //the pdf viewer will take up all of the width and height
        height: 600, //window.innerHeight,
    },
    titulo: {
        textAlign: "center"
    },
    espacio: {
        marginTop: 40
    },
    textoinformativo: {
        marginLeft: 40,
        marginRight: 40,
        textAlign: "center",
        marginTop: 40
    },
    espaciotexto: {
        marginLeft: 20,
        marginTop: 20,
        color: "#5A4290"
    },
    espaciotextodos: {
        marginLeft: 20,
        marginTop: 10,
        color: "black"
    },
    image: {
        width: 80,
        height: 80,
    },
    imagedos: {
        width: 100,
        height: 100,
    },
});

function Transactionresponse(props) {
    const [listarTransaccion, setListarTransaccion] = useState([]);
    const [estadoTransaccion, setEstadoTransaccion] = useState("");
    const [valorPago, setValorPago] = useState(0);

    useEffect(() => {
        let idtransaccion = null;
        idtransaccion = JSON.parse(localStorage.getItem("idtransaccion"));

        const transaccion = async () => {

            let params = {
                reference: idtransaccion
            }
            await axios({
                method: 'post',
                url: 'https://api.brokerup.co/bu/5003', params
            }).then(rest => {
                if (rest) {
                    console.log("RETORNA : ", rest.data);
                    setListarTransaccion(rest.data);
                    if (rest.data[0].status == "APPROVED"){
                        setEstadoTransaccion("APROBADA")
                        setValorPago(Intl.NumberFormat("en-US").format(Number.parseFloat(listarTransaccion[0].amount_in_cents)) )
                    }
                        
                    else
                        setEstadoTransaccion("RECHAZADA")
                }
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO TRANSACCION");
            })
        };
        transaccion();

    }, []);

    return (
        <Layout>
            <div className="paginapdf">
                <PDFViewer style={styles.viewer}>
                    {/* Start of the document*/}
                    <Document>
                        {/*render a single page*/}
                        <Page size="LETTER" style={styles.page}>
                            <View style={styles.section}>
                                <Image
                                    style={styles.image}
                                    src="/logobrokerup.jpg"
                                />
                                <Text style={styles.titulo} >BrokerUp</Text>
                            </View>
                            {
                                listarTransaccion.length > 0 ?
                                    (
                                        <View>
                                            <Text style={styles.titulo}  >Transacción: {estadoTransaccion} </Text>
                                            <Text style={styles.espaciotexto}  >
                                                BrokerUp S.A.S.
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Referencia de pago: {listarTransaccion[0].idwompi}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Id Cliente: {listarTransaccion[0].user_legal_id}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Consecutivo comercio: {listarTransaccion[0].reference}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Descripción: "Pago derechos de uso APP Oferta y Demanda"
                                            </Text>
                                            <Text style={styles.espacio}  >
                                            </Text>

                                            <Text style={styles.espaciotexto}>
                                                DATOS DE LA TRANSACCIÓN:
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Fecha: {listarTransaccion[0].created_at}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Valor del pago: {Intl.NumberFormat("en-US").format(Number.parseFloat(listarTransaccion[0].amount_in_cents))}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Medio del pago: {listarTransaccion[0].payment_method}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Estado: {estadoTransaccion}
                                            </Text>

                                            <Text style={styles.textoinformativo}>
                                                Si deseas más información sobre el estado de la transacción,
                                                puedes comunicarte con BrokerUp.via email o telefóno.
                                            </Text>
                                            <Text style={styles.textoinformativo}>
                                                contabilidad@brokerup.com.co - +573155890087
                                            </Text>

                                        </View>
                                    )
                                    :
                                    null
                            }
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        </Layout>
    );
}

export default Transactionresponse;