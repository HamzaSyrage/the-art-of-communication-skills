import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { FadeInSectionType } from "../types/type";

const FadeInSection = ({ children, delay = 0 }: FadeInSectionType) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.6, delay }}
		>
			{children}
		</motion.div>
	);
};

export default FadeInSection;
