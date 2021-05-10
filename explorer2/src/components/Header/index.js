/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from 'next/link';
import { SkipToContent } from '../Main';

export function Header() {
  return (
    <header aria-label="Explorer">
      <SkipToContent />
      <span>
        <Link href="/">Explorer</Link>
      </span>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
