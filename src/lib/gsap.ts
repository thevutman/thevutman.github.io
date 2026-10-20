import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugins are registered once, here; components import GSAP from this module.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
