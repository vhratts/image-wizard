import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Image-</span>
        <span className={title({ color: "violet" })}>Wizard </span>
        <span className={title()}>📸🧙‍♂️</span>
        <br />
        <span className={title()}>
          Api para contrução e edição simples de imagens.
        </span>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            variant: "bordered",
            radius: "full",
            color: "secondary",
          })}
          href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvhratts%2Fimage-wizard"
        >
          Deploy
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
