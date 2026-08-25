import "./globals.css";
import { anton, generalSans, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { MenuProvider } from "@/components/ui/MenuContext";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var stored = localStorage.getItem('theme');

                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>

      <body>
        <CustomCursor />

        <ThemeProvider>
          <MenuProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}