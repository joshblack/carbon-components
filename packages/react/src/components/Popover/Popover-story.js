/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import React from 'react';
import { Popover, PopoverContent } from '../Popover';

export default {
  title: 'Popover',
  component: Popover,
  subcomponents: {
    PopoverContent,
  },
};

export const Default = () => {
  function PopoverDemo() {
    const [direction, setDirection] = React.useState('top');
    const [open, setOpen] = React.useState(true);
    const choices = [
      'top',
      'top-left',
      'top-right',

      'bottom',
      'bottom-left',
      'bottom-right',

      'left',
      'left-bottom',
      'left-top',

      'right',
      'right-bottom',
      'right-top',
    ];

    return (
      <>
        <section>
          <h2>Caret Position</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gridGap: 8,
            }}>
            {choices.map((choice) => {
              return (
                <label key={choice}>
                  <input
                    type="radio"
                    name="direction"
                    value={choice}
                    checked={choice === direction}
                    onChange={() => {
                      setDirection(choice);
                    }}
                  />
                  {choice}
                </label>
              );
            })}
          </div>
        </section>
        <section>
          <h2>Popover Visibility</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value={open}
                checked={open}
                onChange={() => {
                  setOpen(!open);
                }}
              />
              Open
            </label>
          </div>
        </section>
        <div>
          <Popover open={open} direction={direction}>
            <PopoverContent>Hello</PopoverContent>
          </Popover>
        </div>
      </>
    );
  }

  return <PopoverDemo />;
};

const DisclosureContext = React.createContext({});

function Disclosure({ children, ...rest }) {
  const [open, setOpen] = React.useState(false);

  function toggle(event) {
    event.preventDefault();
    console.log('toggle');
    // setOpen(!open);
  }

  return (
    <DisclosureContext.Provider value={{ toggle }}>
      <details {...rest} open={open}>
        {children}
      </details>
    </DisclosureContext.Provider>
  );
}

function DisclosureButton({ children, ...rest }) {
  const { toggle } = React.useContext(DisclosureContext);
  return (
    <summary {...rest} onClick={toggle}>
      {children}
    </summary>
  );
}

export const Trigger = () => {
  return (
    <Disclosure>
      <DisclosureButton>Hello</DisclosureButton>
      <div>Content</div>
    </Disclosure>
  );
};
