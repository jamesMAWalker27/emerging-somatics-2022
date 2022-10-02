import { About } from "../about";
import { Calendar } from "../calendar";
import { Contact } from "../contact";
import { EndCard } from "../end";
import { Hero } from "../hero";
import { Introduction } from "../intro";
import { Overview } from "../overview";

export const SECTION_DATA = [
  { title: 'Welcome',      Component: Hero },
  { title: 'Introduction', Component: Introduction },
  { title: 'Overview',     Component: Overview },
  { title: 'About',        Component: About },
  { title: 'Contact',      Component: Contact },
  { title: 'Calendar',     Component: Calendar },
  { title: 'End',          Component: EndCard },
]