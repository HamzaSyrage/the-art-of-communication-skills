export type FadeInSectionType = {
	children: React.ReactNode;
	delay?: number;
};

export type SkillCardType = {
	icon: React.ElementType;
	title: string;
	description: string;
	delay?: number;
};

export type TimelineItemType = {
	icon: React.ElementType;
	title: string;
	description: string;
	isLeft?: boolean;
	delay?: number;
};
