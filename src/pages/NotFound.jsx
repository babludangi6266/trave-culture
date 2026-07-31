import React from "react";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { Button } from "../components/common/Button";
import { Compass } from "lucide-react";

export function NotFound() {
  return (
    <>
      <SEOHead title="404 Page Not Found — Travel Culture" />

      <main className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[var(--bg)] text-center">
        <Container className="max-w-lg">
          <div className="w-20 h-20 bg-[#E85D3D]/10 text-[#E85D3D] rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <h1 className="font-serif text-6xl font-bold text-[var(--text-primary)] mb-3">
            404
          </h1>
          <h2 className="font-serif text-2xl font-semibold text-[var(--text-primary)] mb-4">
            Looks Like You've Wandered Off The Trail
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
            The page or destination you are looking for has been moved, renamed, or lost in paradise.
          </p>

          <Button to="/" variant="primary" size="lg">
            Return To Home
          </Button>
        </Container>
      </main>
    </>
  );
}
