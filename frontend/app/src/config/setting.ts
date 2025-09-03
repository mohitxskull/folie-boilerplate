import { frontendUrl } from "@/lib";

export const setting = {
  app: {
    name: "My App",
    description: "My App Description",
    banner: frontendUrl("/banner.png").toString(),
    logo: frontendUrl("/logo.png").toString(),
    manifest: frontendUrl("/manifest.json").toString(),
    themeColor: "#ffffff",
  },
};
