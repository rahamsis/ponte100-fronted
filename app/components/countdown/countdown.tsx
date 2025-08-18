'use client'
import { useState, useEffect } from "react";

interface CountdownCircleProps {
    label: string;
    value: number;
    maxValue: number;
}

const CountdownCircle = ({ label, value, maxValue }: CountdownCircleProps) => {
    const radius = 30;
    const stroke = 2;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    // Calcular el porcentaje restante de la unidad
    const percent = value / maxValue;
    const strokeDashoffset = circumference * (1 - percent);

    return (
        <div className="flex flex-col items-center">
            <svg height={radius * 2} width={radius * 2}>
                {/* Círculo de fondo */}
                <circle
                    stroke="#7e8ab2"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                {/* Círculo de progreso */}
                <circle
                    stroke="#aed68d"
                    fill="transparent"
                    strokeWidth={stroke+2}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
                {/* Número centrado */}
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-lg font-light fill-current text-white"
                >
                    {String(value).padStart(2, "0")}
                </text>
            </svg>
            <span className="mt-1 text-[10px] font-extralight">{label}</span>
        </div>
    );
};

export default function CountDown() {
    // 📅 Fecha objetivo
    const targetDate = new Date("2025-11-03T06:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            // 🛑 Si ya llegamos o pasamos la fecha, detener contador
            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            // 📊 Cálculo de días, horas, minutos y segundos restantes
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className=" top-0 left-0">
            <div className="lg:flex items-center  justify-center gap-3 lg:gap-10 text-white bg-primary py-5">
                <div className="lg:hidden pb-2 text-center">
                    <p className="text-[9px] lg:text-sm font-semibold">FALTAN TAN SOLO: </p>
                </div>
                <div className="lg:flex flex-col items-center hidden">
                    <p className="text-[9px] lg:text-sm">FALTAN</p>
                    <p className="text-[9px] lg:text-sm">TAN SOLO</p>
                </div>
                <div className="flex gap-4 justify-center">
                    <CountdownCircle label="DÍAS" value={timeLeft.days} maxValue={307} />
                    <CountdownCircle label="HOR" value={timeLeft.hours} maxValue={24} />
                    <CountdownCircle label="MIN" value={timeLeft.minutes} maxValue={60} />
                    <CountdownCircle label="SEG" value={timeLeft.seconds} maxValue={60} />
                </div>
                <div className="lg:hidden pt-2 text-center">
                    <p className="text-[9px] lg:text-sm font-semibold">Examen de conocimientos 03 NOV 2025</p>
                </div>
                <div className="lg:flex flex-col items-center text-center hidden">
                    <p className="text-[9px] lg:text-sm">03 NOV 2025</p>
                    <p className="text-[9px] lg:text-sm font-semibold">Examen de <br /> conocimientos</p>
                </div>
            </div>
        </div>
    );
}