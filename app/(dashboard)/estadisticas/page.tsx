'use client'

import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

const Estadistica = dynamic(() => import('../../components/estadisticas/grafico'), {
    ssr: false,
});

function Estadisticas() {
    const router = useRouter();
    return (
        <>
            <section className=" md:pb-6  flex-col  mx-4 lg:mx-20 bg-web mt-20 md:mt-28 lg:mt-20">
                <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                    <button className="flex flex-row" onClick={() => router.back()}>
                        <ArrowLeft />
                        <h2 className="text-xl font-bold tracking-tighter text-left ml-3 text-primary">
                            Volver
                        </h2>
                    </button>
                </div>
            </section>
            <section className=" md:pb-6  flex-col mx-2 lgmx-4 lg:mx-20 bg-web">
                <div className="bg-white text-gray-800 p-6">
                    <div className="mx-auto">
                        <header className="bg-black text-white py-3 px-6 rounded">
                            <h1 className="text-xl font-semibold text-center">
                                ESTADÍSTICAS GENERAL DEL PROCESO ASCENSO, AÑO 2023 – PROMOCIÓN 2024
                            </h1>
                        </header>

                        <div className="flex flex-col lg:flex-row justify-center items-center  gap-6">
                            {/* Imagen del gráfico */}
                            <div className="flex-">
                                <Estadistica />
                            </div>

                            {/* Tabla de datos */}
                            <div className="">
                                <h2 className="text-lg font-semibold text-center mb-4">
                                    Estadística General Proceso de Ascenso<br />Año 2023 - Promoción 2024
                                </h2>
                                <table className="w-full border border-gray-300 text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="border border-gray-300 px-3 py-2">Concepto</th>
                                            <th className="border border-gray-300 px-3 py-2">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-3 py-2">Postulantes</td>
                                            <td className="border border-gray-300 px-3 py-2">30,531</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-3 py-2">Ascendieron</td>
                                            <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">10,902</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-3 py-2">No Ascendieron</td>
                                            <td className="border border-gray-300 px-3 py-2">10,772</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-3 py-2 text-red-600">No se presentaron</td>
                                            <td className="border border-gray-300 px-3 py-2 text-red-600">3,880</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-3 py-2 text-red-600">Desaprobados</td>
                                            <td className="border border-gray-300 px-3 py-2 text-red-600">4,977</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="text-xs text-gray-500 mt-4 text-center">
                                    Fuente: Resolución Directoral N° 011223-2023-DIRREHUM PNP. del 18OCT2023
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function EstadisticaFinal() {
    return (
        <>
            <section className=" md:pb-6  flex-col  mx-4 lg:mx-20 bg-web ">
                <div className=" bg-white text-gray-800 p-6">
                    <div className="mx-auto">
                        <header className="bg-black text-white py-3 px-6 rounded">
                            <h1 className="text-xl font-semibold text-center">
                                ESTADÍSTICAS GENERAL DEL PROCESO ASCENSO, AÑO 2024 - PROMOCIÓN 2025
                            </h1>
                        </header>

                        <div className="overflow-x-auto mt-5">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="px-4 py-2 border" colSpan={2}>ESTADÍSTICA DEL PROCESO DE
                                            ASCENSO, AÑO 2024 - PROMOCIÓN 2025</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">Postulantes</td>
                                        <td className="border px-4 py-2">33,005</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Vacantes</td>
                                        <td className="border px-4 py-2">19,065</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Aprobaron (Fisico-Tiro-Conocimiento):</td>
                                        <td className="border px-4 py-2">19,423</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Ascendieron</td>
                                        <td className="border px-4 py-2">16,615</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Aprobados sin vacante</td>
                                        <td className="border px-4 py-2">2,808</td>
                                    </tr>
                                    <tr className='text-red-500'>
                                        <td className="border px-4 py-2">Vacantes perdidas (ST2-ST3-S3)</td>
                                        <td className="border px-4 py-2">2,450</td>
                                    </tr>
                                    <tr className='text-red-500'>
                                        <td className="border px-4 py-2">Desaprobados (Fsico-Tiro-Conocimiento)</td>
                                        <td className="border px-4 py-2">13,582</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mx-auto">
                        <div className="overflow-x-auto mt-5">
                            <table className="min-w-full text-center bg-white  border-gray-200">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="px-4 py-2 border" colSpan={9}>CUADRO DEMOSTRATIVO DEL PROCESO DE ASCENSO,
                                            AÑO 2024 - PROMOCIÓN 2025</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-gray-300 font-bold'>
                                        <td className="border px-4 py-2" colSpan={2}>Grados</td>
                                        <td className="border px-4 py-2">Nota primer puesto</td>
                                        <td className="border px-4 py-2">Nota último puesto</td>
                                        <td className="border px-4 py-2">Cantidad de vacantes</td>
                                        <td className="border px-4 py-2">Vacantes perdidas</td>
                                        <td className="border px-4 py-2">Lograron ascenso</td>
                                        <td className="border px-4 py-2">No ocuparon vacante</td>
                                        <td className="border px-4 py-2">Excluidos del Proceso</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">SB</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">69.04</td>
                                        <td className="border px-4 py-2">55.74</td>
                                        <td className="border px-4 py-2">1,200</td>
                                        <td className="border px-4 py-2">0</td>
                                        <td className="border px-4 py-2">1,200</td>
                                        <td className="border px-4 py-2 text-red-500">290</td>
                                        <td className="border px-4 py-2 text-red-500 font-bold text-xl" rowSpan={7}>889</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">ST1</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">64.75</td>
                                        <td className="border px-4 py-2">54.12</td>
                                        <td className="border px-4 py-2">500</td>
                                        <td className="border px-4 py-2">0</td>
                                        <td className="border px-4 py-2">500</td>
                                        <td className="border px-4 py-2 text-red-500">193</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">ST2</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">65.65</td>
                                        <td className="border px-4 py-2">45.92</td>
                                        <td className="border px-4 py-2">1,356</td>
                                        <td className="border px-4 py-2 text-red-500">601</td>
                                        <td className="border px-4 py-2">751</td>
                                        <td className="border px-4 py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">ST3</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">67.91</td>
                                        <td className="border px-4 py-2">47.92</td>
                                        <td className="border px-4 py-2">1,009</td>
                                        <td className="border px-4 py-2 text-red-500">281</td>
                                        <td className="border px-4 py-2">728</td>
                                        <td className="border px-4 py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">S1</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">71.10</td>
                                        <td className="border px-4 py-2">54.13</td>
                                        <td className="border px-4 py-2">2,000</td>
                                        <td className="border px-4 py-2">0</td>
                                        <td className="border px-4 py-2">2,000</td>
                                        <td className="border px-4 py-2 text-red-500">519</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">S2</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">69.35</td>
                                        <td className="border px-4 py-2">53.47</td>
                                        <td className="border px-4 py-2">3,000</td>
                                        <td className="border px-4 py-2">0</td>
                                        <td className="border px-4 py-2">3,000</td>
                                        <td className="border px-4 py-2 text-red-500">917</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">S3</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">70.30</td>
                                        <td className="border px-4 py-2">45.46</td>
                                        <td className="border px-4 py-2">10,000</td>
                                        <td className="border px-4 py-2 text-red-500">1,568</td>
                                        <td className="border px-4 py-2">8,432</td>
                                        <td className="border px-4 py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">19,065</td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">2,450</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">16,615</td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">1,919</td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">889</td>
                                    </tr>
                                    <tr>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold" colSpan={2}>2,808</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                        CUADRO N°01.- CUADRO DEMOSTRATIVO DEL PROCESO ASCENSO, AÑO 2024 - PROMOCIÓN 2025
                    </p>

                    <div className="mx-auto mt-16">
                        <div className="overflow-x-auto mt-10">
                            <table className="min-w-full text-center bg-white  border-gray-200">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="px-4 py-2 border" colSpan={6}>EJECUCIÓN DE EXAMENES DE SUB OFICIALES PNP DE
                                            ARMAS Y SERVICIOS, AÑO 2024 - PROMOCIÓN 2025</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-gray-300 font-bold'>
                                        <td className="border px-4 py-2">Exámenes</td>
                                        <td className="border px-4 py-2">Actividades</td>
                                        <td className="border px-4 py-2">Desaprobados</td>
                                        <td className="border px-4 py-2">NSP</td>
                                        <td className="border px-4 py-2">Otros Motivos</td>
                                        <td className="border px-4 py-2">Totales</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2" rowSpan={3}>Esfuerzo físico</td>
                                        <td className="border px-4 py-2">1000 metros</td>
                                        <td className="border px-4 py-2">347</td>
                                        <td className="border px-4 py-2">1,428</td>
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2">1,775</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Natación</td>
                                        <td className="border px-4 py-2">1,016</td>
                                        <td className="border px-4 py-2">156</td>
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2">1,172</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Total</td>
                                        <td className="border px-4 py-2 text-red-500">1,363</td>
                                        <td className="border px-4 py-2 text-red-500">1,584</td>
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2 text-red-500">2,947</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2" rowSpan={2}>Destreza técnica</td>
                                        <td className="border px-4 py-2">Tiro policial</td>
                                        <td className="border px-4 py-2">3,489</td>
                                        <td className="border px-4 py-2">104</td>
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2">3,593</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Total</td>
                                        <td className="border px-4 py-2 text-red-500">3,489</td>
                                        <td className="border px-4 py-2 text-red-500">104</td>
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2 text-red-500">3,593</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2" rowSpan={2}>Conocimientos</td>
                                        <td className="border px-4 py-2">Examen virtual</td>
                                        <td className="border px-4 py-2">6,916 (-65)</td>
                                        <td className="border px-4 py-2">119</td>
                                        <td className="border px-4 py-2">7</td>
                                        <td className="border px-4 py-2">7</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Total</td>
                                        <td className="border px-4 py-2 text-red-500">6,916</td>
                                        <td className="border px-4 py-2 text-red-500">119</td>
                                        <td className="border px-4 py-2 text-red-500">7</td>
                                        <td className="border px-4 py-2 text-red-500">7,042</td>
                                    </tr>
                                    <tr>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">13,582</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500  text-center">
                        CUADRO N°02.- CUADRO EJECUCIÓN DE EXÁMENES SUB OFICIALES ARMAS Y SERVICIOS, AÑO 2024 - PROMOCIÓN 2025.
                    </p>

                    <div className="mx-auto mt-16">
                        <div className="overflow-x-auto mt-10">
                            <table className="min-w-full text-center bg-white  border-gray-200">
                                <thead className="bg-primary text-white">
                                    {/* <tr>
                                        <th className="px-4 py-2 border" colSpan={2} rowSpan={2}>POSTULANTES APTOS PARA EL EXAMEN DE
                                            CONOCIMIENTOS
                                        </th>
                                        <th>Desaprobados</th>
                                        <th>NSP</th>
                                        <th>Otros Motivos</th>
                                        <th></th>
                                    </tr> */}
                                </thead>
                                <tbody>
                                    <tr className=''>
                                        <td className="border px-4 py-2 bg-primary text-white font-bold" rowSpan={2} colSpan={2}>POSTULANTES APTOS PARA EL EXAMEN DE CONOCIMIENTOS</td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">26,465</td>
                                    </tr>
                                    <tr className=''>
                                        <td className="border px-4 py-2">Desaprobados</td>
                                        <td className="border px-4 py-2">NSP</td>
                                        <td className="border px-4 py-2">Otros Motivos</td>
                                        <td className="border px-4 py-2"></td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2" rowSpan={2}>Conocimientos</td>
                                        <td className="border px-4 py-2">Examen virtual</td>
                                        <td className="border px-4 py-2">6,916 (-65)</td>
                                        <td className="border px-4 py-2">119</td>
                                        <td className="border px-4 py-2">7</td>
                                        <td className="border px-4 py-2"></td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Total</td>
                                        <td className="border px-4 py-2 text-red-500">6,916</td>
                                        <td className="border px-4 py-2 text-red-500">119</td>
                                        <td className="border px-4 py-2 text-red-500">7</td>
                                        <td className="border px-4 py-2 text-red-500">7,042</td>
                                    </tr>
                                    <tr>
                                        <td className="border font-bold" colSpan={2}>POSTULANTES QUE APROBARON EL EXAMEN DE CONOCIMIENTOS</td>
                                        <td className="border" colSpan={3}></td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">19,423</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500  text-center">
                        CUADRO N°03.- CUADRO POSTULANTES APTOS, DESAPROBADOS, NSP,
                        EXAMEN DE CONOCIMIENTOS, AÑO 2024 - PROMOCIÓN 2025.
                    </p>

                    <div className="mx-auto mt-16">
                        <div className="overflow-x-auto mt-5">
                            <table className="min-w-full text-center bg-white  border-gray-200">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="px-4 py-2 border" colSpan={9}>CUADRO DEMOSTRATIVO DE SUB OFICIALES DE ARMAS Y SERVICIOS QUE SE PRESENTARON, DESAPROBADOS,
                                            APROBADOS, NSP Y OTROS; AL EXAMEN DE CONOCIMIENTO, AÑO 2024 - PROMOCIÓN 2025</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className=''>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold" colSpan={2}>Grados</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">Presentaron</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">Aprobados</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">Desaprobados</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">NSP</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">Otros Motivos</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">Total</td>
                                        <td className="border px-4 py-2 rotate-[-90deg]" rowSpan={8}>NO OCUPARON VACANTES - <br />
                                            EXCLUIDOS DIFERENTES MOTIVOS</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">SB</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">1,544</td>
                                        <td className="border px-4 py-2">1,200</td>
                                        <td className="border px-4 py-2 text-red-500">340</td>
                                        <td className="border px-4 py-2 text-red-500">4</td>
                                        <td className="border px-4 py-2 text-red-500"></td>
                                        <td className="border px-4 py-2">1544</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">ST1</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">840</td>
                                        <td className="border px-4 py-2">500</td>
                                        <td className="border px-4 py-2 text-red-500">329</td>
                                        <td className="border px-4 py-2 text-red-500">11</td>
                                        <td className="border px-4 py-2 text-red-500"></td>
                                        <td className="border px-4 py-2">840</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">ST2</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">1,027</td>
                                        <td className="border px-4 py-2">755</td>
                                        <td className="border px-4 py-2 text-red-500">261</td>
                                        <td className="border px-4 py-2 text-red-500">11</td>
                                        <td className="border px-4 py-2 text-red-500"></td>
                                        <td className="border px-4 py-2">1,027</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">ST3</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">857</td>
                                        <td className="border px-4 py-2">728</td>
                                        <td className="border px-4 py-2 text-red-500">127</td>
                                        <td className="border px-4 py-2 text-red-500">1</td>
                                        <td className="border px-4 py-2 text-red-500">1</td>
                                        <td className="border px-4 py-2">857</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">S1</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">2,121</td>
                                        <td className="border px-4 py-2">2,000</td>
                                        <td className="border px-4 py-2 text-red-500">115</td>
                                        <td className="border px-4 py-2 text-red-500">6</td>
                                        <td className="border px-4 py-2 text-red-500"></td>
                                        <td className="border px-4 py-2">2,121</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">S2</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">3587</td>
                                        <td className="border px-4 py-2">3,000</td>
                                        <td className="border px-4 py-2 text-red-500">560</td>
                                        <td className="border px-4 py-2 text-red-500">26</td>
                                        <td className="border px-4 py-2 text-red-500">1</td>
                                        <td className="border px-4 py-2">3,587</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">S3</td>
                                        <td className="border px-4 py-2">PNP</td>
                                        <td className="border px-4 py-2">13,681</td>
                                        <td className="border px-4 py-2">8,432</td>
                                        <td className="border px-4 py-2 text-red-500">5,184</td>
                                        <td className="border px-4 py-2 text-red-500">60</td>
                                        <td className="border px-4 py-2 text-red-500">5</td>
                                        <td className="border px-4 py-2">13,681</td>
                                    </tr>
                                    <tr>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">6,916</td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">119</td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">7</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">23,657</td>
                                        <td className="border px-4 py-2 bg-gray-300 font-bold">2,808</td>
                                    </tr>
                                    <tr>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className=""></td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold">7,042</td>
                                        <td className="border px-4 py-2 bg-gray-300 text-red-500 font-bold" colSpan={2}>26,465</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                        CUADRO N°04.- CUADRO DEMOSTRATIVO DESARROLLO DEL EXAMEN DE CONOCIMIENTOS DE SUB OFICIALES DE
                        ARMAS Y SERVICIOS, AÑO 2024 - PROMOCIÓN 2025.
                    </p>

                    <p className='mt-36'>Fuente: DIRREHUM PNP</p>
                    <ul className="list-disc">
                        <li>Resolución Comandancia General N° 414-2024-CG PNP/SECEJE-DIRREHUM, del 10OCT2024</li>
                        <li>Resolución Directoral N° 012356-2024-DIRREHUM-PNP, del 11NOV2024.</li>
                        <li>Resolución Directoral N° 013029-2024-DIRREHUM-PNP, del 27NOV2024.</li>
                        <li>Resolución Directoral N° 015106-2024-DIRREHUM-PNP, del 30DIC2024.</li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default function EstadisticasOficiales() {

    return (
        <>
            <Estadisticas />

            <EstadisticaFinal />
        </>
    )
}