import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Canvas",
  description: "Business Canvas Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          rel="preload"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4a7cfe",
            },
            components: {
              Button: {
                colorPrimary: "#4a7cfe",
                colorPrimaryHover: "#739fff",
                colorPrimaryActive: "#345DD9",
              },
              Checkbox: {
                colorPrimary: "#4a7cfe",
              },
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
