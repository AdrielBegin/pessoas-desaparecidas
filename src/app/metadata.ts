import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Pessoas Desaparecidas - Polícia Civil MT",
  description: "Plataforma oficial da Polícia Judiciária Civil de Mato Grosso para consulta de pessoas desaparecidas. Ajude a localizar pessoas desaparecidas fornecendo informações.",
  keywords: "pessoas desaparecidas, polícia civil, mato grosso, localização, busca",
  authors: [{ name: "Polícia Civil de Mato Grosso" }],
  creator: "Polícia Civil MT",
  openGraph: {
    title: "Pessoas Desaparecidas - Polícia Civil MT",
    description: "Plataforma oficial da Polícia Judiciária Civil de Mato Grosso para consulta de pessoas desaparecidas.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pessoas Desaparecidas - Polícia Civil MT",
    description: "Plataforma oficial da Polícia Judiciária Civil de Mato Grosso para consulta de pessoas desaparecidas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
