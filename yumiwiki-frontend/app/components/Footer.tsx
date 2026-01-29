import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-200">
            YumiWiki
          </Link>
          <span>|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200"
          >
            GitHub
          </a>
          <span>|</span>
          <Link href="/contact" className="hover:text-gray-900 dark:hover:text-gray-200">
            문의하기
          </Link>
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-500">
          © 2026 YumiWiki. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
