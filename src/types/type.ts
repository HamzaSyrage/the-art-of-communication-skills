export interface FadeInSectionType {
	children: React.ReactNode;
	delay?: number;
}

export interface QuizQuestion {
	id: number;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
}

export interface SkillCardType {
	icon: React.ElementType;
	title: string;
	description: string;
	delay?: number;
}

export interface TimelineItemType {
	icon: React.ElementType;
	title: string;
	description: string;
	isLeft?: boolean;
	delay?: number;
}
