import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';

export default function Index() {
  return (

    <Layout >
      {/* Header card */}
      <header className='row' >
        <div className='col-md-12'>
          <div className='card card-body fondoprincipal text-white'>
            <div className='row'>
              <div className='col-md-4'>
                <img 
                className='img-fluid'
                src="/ofertaydemanda3.jpg" alt="" />
              </div>
              <div className='col-md-8'>
                <h1>Broker Up</h1>
                <p className='texto'>
                BrokerUp es una solución innovadora, efectiva y segura,
                que lleva tu negocio inmobiliario a niveles superiores,
                al automatizar y gestionar los inventarios en línea de manera ágil.
                </p>
                <a className='colortextocomprar' href='/llamar'>
                  Comprar
                </a>
              </div>
              <div className='col-md-8'>

              </div>
            </div>
          </div>

        </div>

      </header>
    </Layout>

  )
}