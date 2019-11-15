/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/src/components/accordion/_accordion.scss';
import {
  isElementVisible,
  getByText,
  getButtonByText,
} from '@carbon/test-utils/dom';
import {
  pressTab,
  pressShiftTab,
  pressEnter,
  pressSpace,
} from '@carbon/test-utils/keyboard';
import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { default as Accordion, AccordionItem } from '../';

describe('Accordion', () => {
  afterEach(cleanup);

  describe('automated accessibility tests', () => {
    it('should have no AVT1 violations', async () => {
      render(
        <Accordion>
          <AccordionItem title="Heading A">Panel A</AccordionItem>
          <AccordionItem title="Heading B">Panel B</AccordionItem>
          <AccordionItem title="Heading C">Panel C</AccordionItem>
        </Accordion>
      );

      await expect(document).toHaveNoViolations();
    });
  });

  // https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction
  describe('with a keyboard', () => {
    it('should include accordion headers in the tab sequence', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem title="Heading A">
            <span>Panel A</span>
            <button>Interactive content</button>
          </AccordionItem>
          <AccordionItem title="Heading B">Panel B</AccordionItem>
          <AccordionItem title="Heading C">Panel C</AccordionItem>
        </Accordion>
      );
      const headings = [
        getButtonByText(container, 'Heading A'),
        getButtonByText(container, 'Heading B'),
        getButtonByText(container, 'Heading C'),
      ];

      for (const heading of headings) {
        pressTab();
        expect(document.activeElement).toEqual(heading);
      }

      // Reset focus to `document.body`
      document.activeElement.blur();

      for (const heading of headings.reverse()) {
        pressShiftTab();
        expect(document.activeElement).toEqual(heading);
      }
    });

    it('should open or collapse the panel for an accordion panel when Enter or Space is pressed', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem title="Heading A">
            <span>Panel A</span>
            <button>Interactive content</button>
          </AccordionItem>
          <AccordionItem title="Heading B">Panel B</AccordionItem>
          <AccordionItem title="Heading C">Panel C</AccordionItem>
        </Accordion>
      );

      const firstHeading = getButtonByText(container, 'Heading A');
      const firstPanel = getByText(container, 'Panel A');

      pressTab();
      expect(firstHeading.getAttribute('aria-expanded')).toBe('false');
      expect(isElementVisible(firstPanel)).toBe(false);

      pressEnter();
      expect(firstHeading.getAttribute('aria-expanded')).toBe('true');
      expect(isElementVisible(firstPanel)).toBe(true);

      pressEnter();
      expect(firstHeading.getAttribute('aria-expanded')).toBe('false');
      Simulate.animationEnd(firstHeading);
      expect(isElementVisible(firstPanel)).toBe(false);

      pressSpace();
      expect(firstHeading.getAttribute('aria-expanded')).toBe('true');
      expect(isElementVisible(firstPanel)).toBe(true);

      pressSpace();
      expect(firstHeading.getAttribute('aria-expanded')).toBe('false');
      Simulate.animationEnd(firstHeading);
      expect(isElementVisible(firstPanel)).toBe(false);
    });

    // Down Arrow, Up Arrow, Home, End
  });

  describe('with a screen reader', () => {
    it('should contain the title of each accordion header in an element with role `button`', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem title="Heading A">
            <span>Panel A</span>
            <button>Interactive content</button>
          </AccordionItem>
          <AccordionItem title="Heading B">Panel B</AccordionItem>
          <AccordionItem title="Heading C">Panel C</AccordionItem>
        </Accordion>
      );
      const headings = ['Heading A', 'Heading B', 'Heading C'];

      for (const heading of headings) {
        expect(getButtonByText(container, heading)).toBeDefined();
      }
    });

    // Each accordion header button is wrapped in an element with role heading
    // that has a value set for aria-level that is appropriate for the
    // information architecture of the page.

    // The accordion header button element has aria-controls set to the ID of the element containing the accordion panel content.
  });

  describe('with a mouse', () => {
    it('should open or collapse the panel for an accordion panel when a mouse click is triggered', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem title="Heading A">
            <span>Panel A</span>
            <button>Interactive content</button>
          </AccordionItem>
          <AccordionItem title="Heading B">Panel B</AccordionItem>
          <AccordionItem title="Heading C">Panel C</AccordionItem>
        </Accordion>
      );

      const firstHeading = getButtonByText(container, 'Heading A');
      const firstPanel = getByText(container, 'Panel A');

      expect(firstHeading.getAttribute('aria-expanded')).toBe('false');
      expect(isElementVisible(firstPanel)).toBe(false);

      Simulate.click(firstHeading);
      expect(firstHeading.getAttribute('aria-expanded')).toBe('true');
      expect(isElementVisible(firstPanel)).toBe(true);

      Simulate.click(firstHeading);
      expect(firstHeading.getAttribute('aria-expanded')).toBe('false');
      Simulate.animationEnd(firstHeading);
      expect(isElementVisible(firstPanel)).toBe(false);
    });
  });

  describe('component API', () => {
    describe('Accordion', () => {
      it('should allow adding a `className` to the containing `<ul>` node', () => {
        const customClass = 'custom-class';
        const { container } = render(<Accordion className={customClass} />);
        expect(container.firstChild.classList.contains(customClass)).toBe(true);
      });
    });

    describe('AccordionItem', () => {
      it('should set the accordion heading text with the `title` prop', () => {
        const heading = 'Heading';
        const { container } = render(<AccordionItem title={heading} />);
        expect(getButtonByText(container, heading)).toBeDefined();
      });

      it('should allow adding a `className` to each containing `<li>` node', () => {
        const customClass = 'custom-class';
        const { container } = render(
          <AccordionItem className={customClass} title="Heading" />
        );
        expect(container.firstChild.classList.contains(customClass)).toBe(true);
      });

      it('should call `onHeadingClick` when the accordion heading is clicked', () => {
        const onHeadingClick = jest.fn();
        const { container } = render(
          <Accordion>
            <AccordionItem title="Heading A" onHeadingClick={onHeadingClick}>
              <span>Panel A</span>
              <button>Interactive content</button>
            </AccordionItem>
            <AccordionItem title="Heading B">Panel B</AccordionItem>
            <AccordionItem title="Heading C">Panel C</AccordionItem>
          </Accordion>
        );

        const firstHeading = getButtonByText(container, 'Heading A');
        Simulate.click(firstHeading);
        expect(onHeadingClick).toHaveBeenCalledTimes(1);
      });

      it('should support custom `children`', () => {
        const ChildComponent = jest.fn(() => <span>content</span>);
        render(
          <AccordionItem title="Heading">
            <ChildComponent />
          </AccordionItem>
        );
        expect(ChildComponent).toHaveBeenCalledTimes(1);
      });
    });
  });
});
