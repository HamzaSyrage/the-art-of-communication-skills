import type { TimelineItemType } from "../types/type";
import FadeInSection from "./FadeInSection";

const TimelineItem = ({
	icon: Icon,
	title,
	description,
	isLeft = false,
	delay = 0,
}: TimelineItemType) => (
	<FadeInSection delay={delay}>
		<div
			className={`flex z-10 items-center mb-12 ${
				isLeft ? "flex-row-reverse" : ""
			}`}
		>
			<div className="flex-1">
				<div
					className={`bg-white p-6 rounded-2xl shadow-lg ${
						isLeft ? "mr-8" : "ml-8"
					}`}
				>
					<div className="flex items-center mb-4">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
							<Icon className="w-6 h-6 text-white" />
						</div>
						<h3 className="text-xl font-bold text-gray-800">{title}</h3>
					</div>
					<p className="text-gray-600 leading-relaxed">{description}</p>
				</div>
			</div>
			<div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0 z-10"></div>
		</div>
	</FadeInSection>
);

export default TimelineItem;
