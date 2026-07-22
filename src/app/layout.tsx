import { Providers } from "@/components/Providers";
import "../index.css";

export const metadata = {
    title: "Cuestionario de Estrés y Agotamiento",
    description: "Identifica cómo tu cuerpo y mente están respondiendo a la presión, e identifica si estás al borde del burnout con nosotros.",
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon.png', type: 'image/png' }
        ],
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
    openGraph: {
        title: "Cuestionario de Estrés y Agotamiento (CP-EA)",
        description: "Evaluación de cuatro dimensiones del estrés",
        images: [
            {
                url: '/og_image_1771229641740.png',
                width: 1200,
                height: 630,
                alt: 'CP-EA Preview',
            }
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
