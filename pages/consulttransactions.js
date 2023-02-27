import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
//import { AddBox, ArrowDownward } from "@material-ui/icons";
import tableIcons from "./MaterialTableIcons";
import Layout from "../components/Layout";
import Moment from "moment";
import { myNumber, nameMonth } from "../utils/ArrayFunctions";

function ConsultTransactions(props) {
    const [listarTransacciones, setListarTransacciones] = useState([]);
    const [pendienteCrear, setPendienteCrear] = useState([]);
    const [itemUpdate, setItemUpdate] = useState([]);
    const fechaactual = Moment(new Date()).subtract(5, 'days');
    const fechacompara = Moment(fechaactual).format("YYYY-MM-DD HH:mm:ss");
    //console.log("FECHA : ", fechacompara)

    useEffect(() => {
        const movimientos = async () => {
            await axios({
                method: 'post',
                url: 'https://api.brokerup.co/bu/5001'
            }).then(rest => {
                if (rest) {
                    console.log("RETORNA : ", rest.data);
                    setListarTransacciones(rest.data);
                }
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO MOVIMIENTOS");
            })
        };
        movimientos();
    }, []);

    const grabarDatos = (datos) => {
        console.log("DATOS : ", datos)
        const params = {

        };
        /*
            const datosped = async () => {
              await axios({
                method: "post",
                url: "https://sitbusiness.co/cyclewear/api/214",
                params,
              })
                .then((res) => {
                  console.log("DATOS PEDIDO : ", datos.idcliente);
                  seleccionarPedido(params);
                })
                .catch(function (error) {
                  console.log("ERROR EN DATOS PEDIDO");
                });
            };
            datosped();*/
    }

    const columnas = [
        {
            field: 'reference',
            title: 'Referencia',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'created_at',
            title: 'Fecha',
            cellStyle: { minWidth: 200 },
            type: 'date',
            render: rowData => Moment(rowData.created_at).format('YYYY-MM-DD HH:mm')
        },
        {
            field: 'legal_id',
            title: 'Cedula',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'full_name',
            title: 'Cliente',
            cellStyle: { minWidth: 100 }
        },

        {
            field: 'city',
            title: 'Ciudad',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'payment_method',
            title: 'Medio Pago',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'status',
            title: 'Estado',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'amount_in_cents',
            title: 'valor',
            cellStyle: { minWidth: 50 },
            type: 'number',
            render:  rowData => Intl.NumberFormat("en-US").format(Number.parseFloat(rowData.amount_in_cents))
        }
    ]

    return (
        <Layout>
            <div className="tamanoconsultamvto">
                <MaterialTable
                    title="TRANSACCIONES PASARELA DE PAGOS BROKERUP"
                    columns={columnas}
                    icons={tableIcons}
                    data={listarTransacciones}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...pendienteCrear];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setPendienteCrear([...dataUpdate]);
                                    setItemUpdate(newData);
                                    grabarDatos(newData);
                                    resolve();
                                }, 1000)
                            }),
                    }}
                    options={{
                        actionsColumnIndex: 11,
                        headerStyle: { backgroundColor: '#63ABDD', fontSize: 14, color: 'white', height: '30px' },
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.created_at > fechacompara) ? '#C186E3' : '#FFF'
                        })
                    }}
                />
            </div>
        </Layout >
    );
}

export default ConsultTransactions;