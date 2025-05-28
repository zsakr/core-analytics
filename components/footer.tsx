import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo size={24} />
              <h3 className="text-lg font-normal">Core Analytics</h3>
            </div>
            <p className="text-sm text-muted-foreground">Advanced analytics for squash players and coaches.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-normal">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/core-insights" className="text-sm text-muted-foreground hover:text-primary">
                  Core Insights
                </Link>
              </li>
              <li>
                <Link href="/core-connect" className="text-sm text-muted-foreground hover:text-primary">
                  Core Connect
                </Link>
              </li>
              <li>
                <Link href="/core-academy" className="text-sm text-muted-foreground hover:text-primary">
                  Core Academy
                </Link>
              </li>
              <li>
                <Link href="/memberships" className="text-sm text-muted-foreground hover:text-primary">
                  Memberships
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-normal">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Core Analytics. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

