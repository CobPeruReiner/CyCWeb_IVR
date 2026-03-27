import { useEffect, useRef } from "react";

/**
 * @param {Object} opts
 * @param {number} opts.timeoutMs
 * @param {function} opts.onIdle
 * @param {number} [opts.eventsThrottleMs=1000]
 */

export const useIdleTimer = ({ timeoutMs, onIdle, eventsThrottleMs = 1000 }) => {
    const idleTimer = useRef(null);
    const lastHandledTs = useRef(0);

    useEffect(() => {
        if (!timeoutMs || typeof onIdle !== "function") return;

        const startTimer = () => {
            clearTimer();
            idleTimer.current = setTimeout(() => {
                try {
                    onIdle();
                } catch (e) {}
            }, timeoutMs);
        };

        const clearTimer = () => {
            if (idleTimer.current) {
                clearTimeout(idleTimer.current);
                idleTimer.current = null;
            }
        };

        const now = () => Date.now();

        const resetIfNeeded = () => {
            const ts = now();
            if (ts - lastHandledTs.current < eventsThrottleMs) return;
            lastHandledTs.current = ts;
            startTimer();
        };

        const activityEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "touchmove", "wheel"];

        const onVisibilityChange = () => {
            if (!document.hidden) resetIfNeeded();
        };

        startTimer();

        activityEvents.forEach((evt) => window.addEventListener(evt, resetIfNeeded, { passive: true }));
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            clearTimer();
            activityEvents.forEach((evt) => window.removeEventListener(evt, resetIfNeeded));
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, [timeoutMs, onIdle, eventsThrottleMs]);
};
