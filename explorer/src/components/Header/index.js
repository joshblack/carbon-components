/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './Header.module.scss';

import Link from 'next/link';
import { HStack } from '~/components/Stack';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a>Carbon Explorer</a>
      </Link>
      <HStack as="ul" step={5}>
        <li>
          <Link href="/workspaces/carbon-components-react">
            <a>React</a>
          </Link>
        </li>
        <li>
          <Link href="/workspaces/carbon-components">
            <a>Styles</a>
          </Link>
        </li>
      </HStack>
    </header>
  );
}
