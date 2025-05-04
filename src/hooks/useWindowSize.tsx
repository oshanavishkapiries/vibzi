/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from "react";

export function useWindowSize() {
    const breakpoints = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
    };

    const [currentBreakpoint, setCurrentBreakpoint] = useState<keyof typeof breakpoints>("xs");

    const getBreakpoint = (width: number): keyof typeof breakpoints => {
        if (width >= breakpoints["2xl"]) return "2xl";
        if (width >= breakpoints.xl) return "xl";
        if (width >= breakpoints.lg) return "lg";
        if (width >= breakpoints.md) return "md";
        if (width >= breakpoints.sm) return "sm";
        return "xs";
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setCurrentBreakpoint(getBreakpoint(width));
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return currentBreakpoint;
}
