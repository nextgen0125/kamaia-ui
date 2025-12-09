import { ImageResponse } from "next/og"

// Metadados obrigatórios
export const size = {
    width: 32,
    height: 32,
}
export const contentType = "image/png"

// Geração do favicon
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "black",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36.27 30.74"
                    fill="#fff"
                    width="22"
                    height="22"
                    style={{
                        display: "block",
                        transform: "translateY(1px)", // leve ajuste vertical
                    }}
                >
                    <polygon points="36.27 30.74 27.86 30.74 18.91 16.11 14.54 23.24 7.18 23.24 7.18 30.74 0 30.74 0 0 7.18 0 7.18 21.51 20.36 0 28.77 0 19.59 14.99 26.63 14.99 36.27 30.74" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
