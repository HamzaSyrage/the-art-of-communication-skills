import { motion } from "motion/react";
import type { SkillCardType } from "../types/type";
import FadeInSection from "./FadeInSection";

const SkillCard = ({
	icon: Icon,
	title,
	description,
	delay = 0,
}: SkillCardType) => (
	<FadeInSection delay={delay}>
		<motion.div
			whileHover={{ scale: 1.05, y: -5 }}
			className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
		>
			<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
				<Icon className="w-8 h-8 text-white" />
			</div>
			<h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
			<p className="text-gray-600 leading-relaxed">{description}</p>
		</motion.div>
	</FadeInSection>
);

export default SkillCard;
