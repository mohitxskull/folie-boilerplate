import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/config/theme";
import { NavigationProgress } from "@mantine/nprogress";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextSeo } from "next-seo";
import { setting } from "@/config/setting";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <NextSeo
        title={setting.app.name}
        description={setting.app.description}
        openGraph={{
          title: setting.app.name,
          description: setting.app.description,
          url: router.asPath,
          site_name: setting.app.name,
          images: [
            {
              url: setting.app.banner,
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: setting.app.logo,
          },
          {
            rel: "manifest",
            href: setting.app.manifest,
          },
        ]}
        additionalMetaTags={[
          {
            name: "theme-color",
            content: setting.app.themeColor,
          },
        ]}
      />

      <GoogleTagManager gtmId="GTM-XYZ" />

      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <NuqsAdapter>
            <NavigationProgress />
            <Notifications />
            <Component {...pageProps} />
          </NuqsAdapter>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
