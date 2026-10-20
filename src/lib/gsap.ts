import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugins are registered once, here; components import GSAP from this module.
gsap.registerPlugin(ScrollTrigger, Flip);

export { Flip, gsap, ScrollTrigger };
