# Learning resources

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Design Systems](#design-systems)
- [React.js](#reactjs)
  - [Hooks](#hooks)
    - [Getting started](#getting-started)
- [Accessibility](#accessibility)
  - [Getting started](#getting-started-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Design Systems

[Design Systems Handbook](https://www.designbetter.co/design-systems-handbook)

## React.js

### Hooks

#### Getting started

[Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)

The one where it all began. Includes a video introduction from Sophie Alpert and
Dan Abramov that shows the motivation for why they exist. This is a lot of stuff
at first, and there may be some friendlier alternatives to help make learning
this easier.

[Fun with React Hooks](https://www.youtube.com/watch?v=1jWS7cCuUXw)

Great overview of where hooks come from, and how they work. Demystify hooks,
quit thinking the code is magic.

[90% Cleaner React with Hooks](https://www.youtube.com/watch?v=wXLf18DsV-I)

Now that you're getting up and running...

[React Hook Pitfalls](https://www.youtube.com/watch?v=VIRcX2X7EUk)

Now that you know enough to be dangerous, you've problem run into some issues
that really make you scratch your head.

[Composing behavior in React or Why React Hooks are Awesome](https://www.youtube.com/watch?v=nUzLlHFVXx0)

Advanced techniques where we use hooks in hooks. Whattt, wait are we back to
magic?

## Accessibility

> IBM firmly believes that web and software experiences should be accessible for
> everyone, regardless of abilities or impairments. Carbon is committed to
> following and complying with best practices when it comes to accessibility.
>
> _[Carbon Design System - Accessibility](https://www.carbondesignsystem.com/guidelines/accessibility/overview)_

Accessibility Verification Testing (AVT) at IBM is broken up into three stages:

- **AVT1:** automated checks
- **AVT2:** manual checks that cannot be automated through tooling
- **AVT3:** manual checks to verify screen reader support for JAWS, NVDA, and
  VoiceOver

_For full information about each stage, we recommend checking out
[IBM Accessibility's guided tour](https://ibm.biz/BdzgUf) (Internal only link)._

This section is dedicated to helping you get up-and-running with accessibility
in the context of a design system.

### Getting started

The IBM Accessibility team (IBMa) has put out two incredible resources that will
help answer a lot of questions that you may have. We recommend checking them out
before anything else:

- [IBMa (Internal)](https://w3.ibm.com/able)
- [IBM Accessibility Handbook](http://accessibility-handbook.mybluemix.net/design/a11y-handbook/)

For developers on the team, or contributors looking to learn more about how we
do AVT on our team, head on over to our
[AVT testing guide](./guides/accessibility.md).

In addition to IBM projects and our project documentation, team members often
consult external resources that are often lifesavers when attempting to build
accessible components. These include:

[WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/)

**The** reference document for understanding how to use WAI-ARIA to create
accessible applications on the web. This document includes information around
design patterns and widgets, alongside information around structuring an
application to help individuals better find information on the pages you create.

[The A11Y Project](https://a11yproject.com/)

> A community-driven effort to make web accessibility easier.

[Inclusive components](https://inclusive-components.design/)

> A blog trying to be a pattern library. All about designing inclusive web
> interfaces, piece by piece.

[Accessible states in Design Systems](https://www.youtube.com/watch?v=k_7yqLyHc3U&list=PLn7dsvRdQEfFd5n_h8gltIoTfzUE_zywu)

> This talk will look at a the importance of states (visited, focus, active,
> checked/selected, open and more) when building design systems. We will explore
> their relevance, how to maintain consistency and how to systemise when
> designing at scale.

[Short note on `aria-label`, `aria-labelledby`, and `aria-describedby`](https://developer.paciellogroup.com/blog/2017/07/short-note-on-aria-label-aria-labelledby-and-aria-describedby/)

#### Screen readers

- NVDA
  - [Basics](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=10)
- VoiceOver
  - [Basics](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=7)
- JAWS
  - [Install (Internal only)](http://ibm.biz/JAWSserver)

#### Videos and screencasts

- [A11ycasts](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
