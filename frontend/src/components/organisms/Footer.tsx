import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
                <h4 className="font-semibold">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="#">Help Center</Link></li>
                    <li><Link href="#">AirCover</Link></li>
                    <li><Link href="#">Anti-discrimination</Link></li>
                    <li><Link href="#">Disability support</Link></li>
                    <li><Link href="#">Cancellation options</Link></li>
                </ul>
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold">Hosting</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="#">ThanhTungAllInOne your home</Link></li>
                    <li><Link href="#">AirCover for Hosts</Link></li>
                    <li><Link href="#">Hosting resources</Link></li>
                    <li><Link href="#">Community forum</Link></li>
                    <li><Link href="#">Hosting responsibly</Link></li>
                </ul>
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold">ThanhTungAllInOne</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="#">Newsroom</Link></li>
                    <li><Link href="#">New features</Link></li>
                    <li><Link href="#">Careers</Link></li>
                    <li><Link href="#">Investors</Link></li>
                    <li><Link href="#">Gift cards</Link></li>
                </ul>
            </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 ThanhTungAllInOneClone, Inc.</p>
             <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#">Privacy</Link>
                <Link href="#">Terms</Link>
                <Link href="#">Sitemap</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
