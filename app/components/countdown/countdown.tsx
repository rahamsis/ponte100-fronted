'use client'
import { useState, useEffect } from "react";

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
        <div className=" top-0 left-0 w-full ">
            <div className="flex items-center gap-5 lg:gap-10 text-white bg-primary justify-center p-1">
                <div className="flex flex-col items-center">
                    <p className="text-[9px] lg:text-sm">FALTAN</p>
                    <p className="text-[9px] lg:text-sm">TAN SOLO</p>
                </div>
                <div className="flex flex-row gap-4 text-center">
                    <div className="relative border border-gray-300 w-10">
                        <p className="text-xs">DÍAS</p>
                        <p className="px-2 text-base font-bold bg-white text-primary">{String(timeLeft.days).padStart(2, '0')}</p>
                    </div>
                    <div className="relative border border-gray-300 w-10">
                        <p className="text-xs">HOR</p>
                        <p className="px-2 text-base font-bold bg-white text-primary">{String(timeLeft.hours).padStart(2, '0')}</p>
                    </div>
                    <div className="relative border border-gray-300 w-10">
                        <p className="text-xs">MIN</p>
                        <p className="px-2 text-base font-bold bg-white text-primary">{String(timeLeft.minutes).padStart(2, '0')}</p>
                    </div>
                    <div className="relative border border-gray-300 w-10">
                        <div className="text-xs">SEG</div>
                        <div className="px-2 text-base font-bold bg-white text-primary ">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    </div>
                </div>
                <div className="flex flex-col items-center">                    
                    <p className="text-[9px] lg:text-sm">03 NOV 2025</p>
                    <p className="text-[9px] lg:text-sm font-semibold">Examen de <br/> conocimientos</p>
                </div>
            </div>
        </div>
    );
}