'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Postulantes', value: 30531 },
    { name: 'Desaprobados', value: 4977 },
    { name: 'No se presentaron', value: 3880 },
    { name: 'No Ascendieron', value: 10772 },
    { name: 'Ascendieron', value: 10902 },
    
    
    
];

const COLORS = ['#20424c', '#02816e', '#1a9d51', '#092c4c', '#75c468',];

export default function Estadistica() {
    const totalPostulantes = 30531;

    return (
        <>
        <div className="lg:flex flex-col items-center  space-y-10 hidden">
            {/* <h2 className="text-2xl font-bold text-center">
                Estadísticas Generales del Proceso de Ascenso 2023 – Promoción 2024
            </h2> */}

            <PieChart width={700} height={700}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    dataKey="value"
                    startAngle={-90}
                    endAngle={-550}
                    label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip/>
                <Legend verticalAlign="bottom" />
            </PieChart>

            {/* <div className="w-full max-w-md">
                <table className="w-full text-sm border border-gray-300">
                    <thead>
                        <tr className="bg-slate-800 text-white">
                            <th className="p-2 border">Categoría</th>
                            <th className="p-2 border">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td className="border p-2 font-medium">Postulantes</td>
                            <td className="border p-2">{totalPostulantes}</td>
                        </tr>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={
                                    item.name === 'No se presentaron' || item.name === 'Desaprobados'
                                        ? 'text-red-600'
                                        : ''
                                }
                            >
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Fuente: Resolución Directoral N° 011223-2023-DIRREHUM PNP. del 18OCT2023
                </p>
            </div> */}
        </div>

        <div className="flex flex-col items-center py-10 space-y-10 lg:hidden">
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    startAngle={-90}
                    endAngle={-550}
                    // label={({ name, percent }) =>
                    //     `${name}: ${(percent * 100).toFixed(1)}%`
                    // }
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip/>
                <Legend verticalAlign="bottom" />
            </PieChart>
        </div>
        </>
    );
}
