import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="nf">
      <p className="nfCode">404</p>
      <h1 className="nfTitle">
        Nothing <span className="serif iri">here</span>.
      </h1>
      <p className="nfSub">This page doesn&apos;t exist — but the work does.</p>
      <Link href="/" className="btn btn-primary">
        <MoveLeft size={16} /> Back home
      </Link>
    </main>
  );
}
