import { H1 } from "@/components/ui/typography";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/component"}>
        <H1>Component</H1>
      </Link>
    </div>
  );
}
