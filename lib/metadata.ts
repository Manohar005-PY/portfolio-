import type { Metadata } from "next";

const BASE_URL = "https://dev-manohar.is-a.dev";

export const siteMetadata = {
  name: "Manohar",
  title: "Manohar — Backend Developer · Python · Java",
  description:
    "Backend developer working with Python, Java, PostgreSQL, and application infrastructure. Computer Science student at MVJ College of Engineering, Bengaluru.",
  url: BASE_URL,
  email: "dmanoharwork@gmail.com",
  github: "https://github.com/Manohar005-PY",
  linkedin: "https://www.linkedin.com/in/manohar-dilip-821a19303/",
};

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: {
      default: siteMetadata.title,
      template: `%s — Manohar`,
    },
    description: siteMetadata.description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: BASE_URL,
      siteName: siteMetadata.name,
      title: siteMetadata.title,
      description: siteMetadata.description,
    },
    twitter: {
      card: "summary",
      title: siteMetadata.title,
      description: siteMetadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}
