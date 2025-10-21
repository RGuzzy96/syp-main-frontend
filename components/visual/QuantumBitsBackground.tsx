// components/visual/QuantumBitsBackground.tsx
"use client";
import { useEffect, useRef } from "react";

export default function QuantumBitsBackground({
    opacity = 0.08,
    fontSize = 14,
    speed = 1,
    color = "rgba(168,85,247,0.9)",
    trailFade = 0.06,
}: {
    opacity?: number;
    fontSize?: number;
    speed?: number;
    color?: string;
    trailFade?: number;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const runningRef = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", { alpha: true })!;

        let dpr = Math.max(1, window.devicePixelRatio || 1);
        let width = 0;
        let height = 0;
        const columnsRef = { count: 0, y: [] as number[] };

        const resize = () => {
            // 부모 요소 크기에 맞추기
            const parent = canvas.parentElement!;
            const rect = parent.getBoundingClientRect();

            width = Math.floor(rect.width);
            height = Math.floor(rect.height);

            // CSS 크기는 w-full h-full 로 고정되어 있으므로,
            // 그에 맞는 실제 픽셀 버퍼만 업데이트
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            columnsRef.count = Math.max(1, Math.floor(width / fontSize));
            columnsRef.y = Array.from({ length: columnsRef.count }, () =>
                Math.floor(Math.random() * height)
            );
            ctx.font =
                `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        };

        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (media.matches) {
            resize();
            ctx.globalAlpha = opacity;
            const hue = 260 + Math.random() * 40; // 260~300도 (보라~청록)
            ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${opacity})`;
            for (let x = 0; x < canvas.width / dpr; x += fontSize * 2) {
                for (let y = 0; y < canvas.height / dpr; y += fontSize * 2) {
                    const bit = Math.random() > 0.5 ? "1" : "0";
                    ctx.fillText(bit, x, y);
                }
            }
            return;
        }

        const draw = () => {
            if (!runningRef.current) return;

            // 트레일 페이드
            ctx.fillStyle = `rgba(2,6,23,${trailFade})`; // slate-950 근사
            ctx.fillRect(0, 0, width, height);

            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;

            for (let i = 0; i < columnsRef.count; i++) {
                const x = i * fontSize;
                const y = columnsRef.y[i];
                const bit = Math.random() > 0.5 ? "1" : "0";
                ctx.fillText(bit, x, y);

                const drift = Math.floor(Math.random() * fontSize * speed) + fontSize * 0.8;
                let ny = y + drift;
                if (ny > height + fontSize * 6) ny = Math.floor(Math.random() * 200) - 200;
                columnsRef.y[i] = ny;
            }

            ctx.globalAlpha = 1;
            rafRef.current = requestAnimationFrame(draw);
        };

        const onVisibility = () => {
            runningRef.current = document.visibilityState === "visible";
            if (runningRef.current && rafRef.current == null) {
                rafRef.current = requestAnimationFrame(draw);
            }
        };

        // 부모 크기 변화를 감지
        const ro = new ResizeObserver(resize);
        ro.observe(canvas.parentElement!);

        resize();
        rafRef.current = requestAnimationFrame(draw);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            runningRef.current = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            document.removeEventListener("visibilitychange", onVisibility);
            ro.disconnect();
        };
    }, [opacity, fontSize, speed, color, trailFade]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0 w-full h-full blur-[1px] opacity-80 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
            aria-hidden
        />
    );

}
