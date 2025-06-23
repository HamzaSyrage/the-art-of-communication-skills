import { motion, useInView } from "framer-motion";
import {
	MessageCircle,
	Users,
	Ear,
	Mic,
	Heart,
	Briefcase,
	TrendingUp,
	ArrowRight,
	Quote,
	Send,
	CheckCircle,
	Eye,
	Volume2,
	Handshake,
	Target,
	Star,
	Mail,
	Phone,
	Clock,
	Play,
	X,
	RotateCcw,
	Award,
	AlertCircle,
	Check,
} from "lucide-react";
import React, { useState } from "react";

// Types
interface FadeInSectionType {
	children: React.ReactNode;
	delay?: number;
}

interface QuizQuestion {
	id: number;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
}

interface SkillCardType {
	icon: React.ElementType;
	title: string;
	description: string;
	delay?: number;
}

interface TimelineItemType {
	icon: React.ElementType;
	title: string;
	description: string;
	isLeft?: boolean;
	delay?: number;
}

// Quiz questions
const quizQuestions: QuizQuestion[] = [
	{
		id: 1,
		question: "What year was the first iPhone launched by Steve Jobs?",
		options: ["2006", "2007", "2008", "2009"],
		correctAnswer: 1,
		explanation:
			"The first iPhone was launched by Steve Jobs on January 9, 2007, at the Macworld Conference & Expo.",
	},
	{
		id: 2,
		question:
			"Where did Martin Luther King Jr. deliver his 'I Have a Dream' speech?",
		options: [
			"White House",
			"Lincoln Memorial",
			"Capitol Building",
			"Supreme Court",
		],
		correctAnswer: 1,
		explanation:
			"The speech was delivered on August 28, 1963, at the Lincoln Memorial in Washington, D.C., during the March on Washington.",
	},
	{
		id: 3,
		question: "What was revolutionary about the iPhone's interface?",
		options: [
			"Physical keyboard",
			"Stylus input",
			"Multi-touch screen",
			"Voice control",
		],
		correctAnswer: 2,
		explanation:
			"The iPhone introduced the multi-touch interface, eliminating the need for a physical keyboard or stylus.",
	},
	{
		id: 4,
		question: "How many people attended the March on Washington?",
		options: ["100,000", "150,000", "200,000", "250,000"],
		correctAnswer: 3,
		explanation:
			"Approximately 250,000 people attended the March on Washington for Jobs and Freedom.",
	},
	{
		id: 5,
		question: "What did Steve Jobs call the iPhone during its launch?",
		options: [
			"Smart device",
			"Revolutionary product",
			"Game changer",
			"Magic device",
		],
		correctAnswer: 1,
		explanation:
			"Steve Jobs called it a 'revolutionary and magical product that is literally five years ahead of any other mobile phone.'",
	},
	{
		id: 6,
		question: "What was the main theme of MLK's 'I Have a Dream' speech?",
		options: [
			"Economic equality",
			"Racial equality and unity",
			"Political reform",
			"Educational rights",
		],
		correctAnswer: 1,
		explanation:
			"The speech focused on racial equality, civil rights, and his vision of a united America where people are judged by character, not color.",
	},
	{
		id: 7,
		question: "How much did the first iPhone cost?",
		options: ["$399", "$499", "$599", "$699"],
		correctAnswer: 2,
		explanation:
			"The original iPhone was priced at $499 for the 4GB model and $599 for the 8GB model.",
	},
	{
		id: 8,
		question: "What organization did MLK help found?",
		options: ["NAACP", "SCLC", "SNCC", "CORE"],
		correctAnswer: 1,
		explanation:
			"Martin Luther King Jr. was a founding member and president of the Southern Christian Leadership Conference (SCLC).",
	},
	{
		id: 9,
		question: "What three devices did Jobs say the iPhone combined?",
		options: [
			"Phone, iPod, Internet device",
			"Phone, Camera, Computer",
			"Phone, GPS, Music player",
			"Phone, Email, Games",
		],
		correctAnswer: 0,
		explanation:
			"Jobs said the iPhone was 'three products in one': a widescreen iPod with touch controls, a revolutionary mobile phone, and a breakthrough internet communications device.",
	},
	{
		id: 10,
		question: "In what year did MLK receive the Nobel Peace Prize?",
		options: ["1963", "1964", "1965", "1966"],
		correctAnswer: 1,
		explanation:
			"Martin Luther King Jr. received the Nobel Peace Prize in 1964 at age 35, making him the youngest recipient at that time.",
	},
];

// Quiz Modal Component
const QuizModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const [score, setScore] = useState(0);
	const [answers, setAnswers] = useState<number[]>([]);
	const [isCompleted, setIsCompleted] = useState(false);

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setShowFeedback(false);
		setScore(0);
		setAnswers([]);
		setIsCompleted(false);
	};

	const handleAnswerSelect = (answerIndex: number) => {
		if (showFeedback) return;
		setSelectedAnswer(answerIndex);
		setShowFeedback(true);

		const newAnswers = [...answers, answerIndex];
		setAnswers(newAnswers);

		if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
			setScore(score + 1);
		}
	};

	const handleNextQuestion = () => {
		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedAnswer(null);
			setShowFeedback(false);
		} else {
			setIsCompleted(true);
		}
	};

	const getScoreColor = () => {
		const percentage = (score / quizQuestions.length) * 100;
		if (percentage >= 80) return "text-green-600";
		if (percentage >= 60) return "text-yellow-600";
		return "text-red-600";
	};

	const getScoreMessage = () => {
		const percentage = (score / quizQuestions.length) * 100;
		if (percentage >= 90) return "Outstanding! You're a history expert! 🌟";
		if (percentage >= 80) return "Excellent work! Great knowledge! 🎉";
		if (percentage >= 70) return "Good job! Keep learning! 👍";
		if (percentage >= 60) return "Not bad! Room for improvement! 📚";
		return "Keep studying! You'll do better next time! 💪";
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
				onClick={(e) => e.stopPropagation()}
			>
				{!isCompleted ? (
					<div className="p-8">
						<div className="flex justify-between items-center mb-6">
							<div className="flex items-center gap-4">
								<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold">
									Question {currentQuestion + 1}/{quizQuestions.length}
								</div>
								<div className="text-gray-600">
									Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
								</div>
							</div>
							<button
								onClick={onClose}
								className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
							>
								<X size={24} />
							</button>
						</div>

						<div key={currentQuestion} className="transition-all duration-300">
							<h3 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
								{quizQuestions[currentQuestion].question}
							</h3>

							<div className="space-y-3 mb-6">
								{quizQuestions[currentQuestion].options.map((option, index) => {
									const isSelected = selectedAnswer === index;
									const isCorrect =
										index === quizQuestions[currentQuestion].correctAnswer;
									const showCorrectAnswer = showFeedback && isCorrect;
									const showWrongAnswer =
										showFeedback && isSelected && !isCorrect;

									return (
										<button
											key={index}
											onClick={() => handleAnswerSelect(index)}
											disabled={showFeedback}
											className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
												showCorrectAnswer
													? "border-green-500 bg-green-50 text-green-800"
													: showWrongAnswer
													? "border-red-500 bg-red-50 text-red-800"
													: isSelected
													? "border-blue-500 bg-blue-50 text-blue-800"
													: "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
											}`}
										>
											<div className="flex items-center gap-3">
												<div
													className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
														showCorrectAnswer
															? "border-green-500 bg-green-500 text-white"
															: showWrongAnswer
															? "border-red-500 bg-red-500 text-white"
															: isSelected
															? "border-blue-500 bg-blue-500 text-white"
															: "border-gray-300"
													}`}
												>
													{showCorrectAnswer ? (
														<Check size={14} />
													) : showWrongAnswer ? (
														<X size={14} />
													) : (
														String.fromCharCode(65 + index)
													)}
												</div>
												<span className="font-medium">{option}</span>
											</div>
										</button>
									);
								})}
							</div>

							{showFeedback && (
								<div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6 transition-all duration-300">
									<div className="flex items-start gap-3">
										<AlertCircle className="text-blue-600 mt-1" size={20} />
										<div>
											<h4 className="font-bold text-blue-800 mb-2">
												{selectedAnswer ===
												quizQuestions[currentQuestion].correctAnswer
													? "✅ Correct!"
													: "❌ Incorrect"}
											</h4>
											<p className="text-blue-700 leading-relaxed">
												{quizQuestions[currentQuestion].explanation}
											</p>
										</div>
									</div>
								</div>
							)}

							{showFeedback && (
								<button
									onClick={handleNextQuestion}
									className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
								>
									{currentQuestion < quizQuestions.length - 1
										? "Next Question"
										: "Show Results"}
								</button>
							)}
						</div>
					</div>
				) : (
					<div className="p-8 text-center">
						<div className="mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<Award className="w-8 h-8 text-white" />
							</div>
							<h2 className="text-3xl font-bold text-gray-800 mb-2">
								Quiz Completed!
							</h2>
							<p className="text-gray-600 text-lg">{getScoreMessage()}</p>
						</div>

						<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-gray-100">
							<div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
								{score}/{quizQuestions.length}
							</div>
							<div className="text-gray-600 mb-4">
								{Math.round((score / quizQuestions.length) * 100)}% Correct
							</div>
							<div className="w-full bg-gray-200 rounded-full h-3">
								<div
									className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1500 ease-out"
									style={{ width: `${(score / quizQuestions.length) * 100}%` }}
								/>
							</div>
						</div>

						<div className="flex gap-4">
							<button
								onClick={() => {
									resetQuiz();
								}}
								className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
							>
								<RotateCcw size={20} />
								Try Again
							</button>
							<button
								onClick={onClose}
								className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-bold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

// VideoSection
const VideoSection = () => {
	const [activeVideo, setActiveVideo] = useState<string | null>(null);

	const videos = [
		{
			id: "jobs",
			title: "Steve Jobs iPhone Launch",
			description:
				"Experience the historic moment when Steve Jobs introduced the revolutionary iPhone to the world, changing technology forever.",
			url: "https://youtu.be/MnrJzXM7a6o?si=jU48BfdoAn0Stazn",
			embedId: "MnrJzXM7a6o",
			year: "2007",
			duration: "9:42",
		},
		{
			id: "mlk",
			title: "Martin Luther King Jr. - I Have a Dream",
			description:
				"Witness one of the most powerful speeches in history that inspired millions and changed the course of civil rights.",
			url: "https://youtu.be/vP4iY1TtS3s?feature=shared",
			embedId: "vP4iY1TtS3s",
			year: "1963",
			duration: "17:28",
		},
	];

	return (
		<section className="py-20 bg-gradient-to-br from-white to-gray-200">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
						Historic Moments
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Explore pivotal moments in history that shaped our world. From
						technological breakthroughs to social movements, these speeches
						continue to inspire generations.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{videos.map((video) => (
						<div
							key={video.id}
							className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
						>
							<div className="p-8">
								<div className="flex items-center justify-between mb-4">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
										<Play className="w-6 h-6 text-white" />
									</div>
									<div className="flex items-center gap-4 text-sm text-gray-500">
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4" />
											{video.duration}
										</div>
										<div>{video.year}</div>
									</div>
								</div>

								<h3 className="text-2xl font-bold text-gray-800 mb-4 hover:scale-105 transition-transform cursor-pointer">
									{video.title}
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									{video.description}
								</p>

								{activeVideo === video.id ? (
									<div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-4 bg-black">
										<iframe
											width="100%"
											height="100%"
											src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0&modestbranding=1`}
											title={video.title}
											className="w-full h-full"
										/>
									</div>
								) : (
									<div
										className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mb-4 cursor-pointer border border-gray-200 hover:scale-105 transition-transform"
										onClick={() => setActiveVideo(video.id)}
									>
										<div className="text-center">
											<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
												<Play
													size={24}
													fill="white"
													className="text-white ml-1"
												/>
											</div>
											<p className="text-gray-600 font-medium">
												Click to Play Video
											</p>
										</div>
									</div>
								)}

								{activeVideo === video.id ? (
									<button
										onClick={() => setActiveVideo(null)}
										className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
									>
										<X size={16} />
										Close Video
									</button>
								) : (
									<button
										onClick={() => setActiveVideo(video.id)}
										className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
									>
										<Play size={16} />
										Watch Video
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const FadeInSection = ({ children, delay = 0 }: FadeInSectionType) => {
	const ref = React.useRef(null);
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

function App() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitted(true);
		setTimeout(() => setIsSubmitted(false), 3000);
		setFormData({ name: "", email: "", message: "" });
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const [showQuiz, setShowQuiz] = useState(false);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
			{/* Navigation */}
			<motion.nav
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<MessageCircle className="w-8 h-8 text-blue-600 mr-2" />
							<span className="text-xl font-bold text-gray-800">
								The Art of Communication Skills
							</span>
						</div>
						<div className="hidden md:flex space-x-8 text-gray-600">
							<a href="#home" className="hover:text-blue-600 transition-colors">
								Home
							</a>
							<a
								href="#about"
								className="hover:text-blue-600 transition-colors"
							>
								About
							</a>
							<a
								href="#skills"
								className="hover:text-blue-600 transition-colors"
							>
								Skills
							</a>
							<a
								href="#contact"
								className="hover:text-blue-600 transition-colors"
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</motion.nav>

			{/* Hero Section */}
			<section id="home" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
								The Art of
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									{" "}
									Communication
								</span>
							</h1>
							<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
								Master the essential skills that connect hearts, minds, and
								opportunities. Transform your personal and professional
								relationships through the power of effective communication.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* What is Communication Section */}
			<section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								What is Communication?
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Communication is the bridge between confusion and clarity, the
								pathway from isolation to connection.
							</p>
						</div>
					</FadeInSection>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<FadeInSection delay={0.2}>
							<div className="bg-white p-8 rounded-3xl shadow-lg">
								<h3 className="text-2xl font-bold text-gray-800 mb-6">
									The Foundation of Human Connection
								</h3>
								<p className="text-gray-600 leading-relaxed mb-6">
									Communication is far more than just exchanging words. It's the
									intricate dance of understanding, empathy, and expression that
									forms the cornerstone of all human relationships. Whether
									we're sharing a simple greeting with a stranger or delivering
									a presentation to hundreds, every interaction is an
									opportunity to connect, influence, and inspire.
								</p>
								<p className="text-gray-600 leading-relaxed mb-6">
									At its core, communication involves a sender, a message, a
									medium, and a receiver. But the magic happens in the spaces
									between—the tone, the timing, the context, and the unspoken
									understanding that transforms mere information into meaningful
									connection.
								</p>
								<p className="text-gray-600 leading-relaxed">
									Effective communication is both an art and a science. It
									requires technical knowledge of language and psychology, but
									also the intuitive understanding of human nature, emotional
									intelligence, and the ability to adapt to different
									personalities and situations.
								</p>
							</div>
						</FadeInSection>

						<FadeInSection delay={0.4}>
							<div className="grid grid-cols-2 gap-6">
								<div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
									<Users className="w-10 h-10 mb-4" />
									<h4 className="font-bold mb-2">Connection</h4>
									<p className="text-sm opacity-90">
										Building bridges between minds and hearts
									</p>
								</div>
								<div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
									<Target className="w-10 h-10 mb-4" />
									<h4 className="font-bold mb-2">Clarity</h4>
									<p className="text-sm opacity-90">
										Transforming complex ideas into clear understanding
									</p>
								</div>
								<div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
									<Heart className="w-10 h-10 mb-4" />
									<h4 className="font-bold mb-2">Empathy</h4>
									<p className="text-sm opacity-90">
										Understanding and sharing others' perspectives
									</p>
								</div>
								<div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
									<TrendingUp className="w-10 h-10 mb-4" />
									<h4 className="font-bold mb-2">Influence</h4>
									<p className="text-sm opacity-90">
										Inspiring action and positive change
									</p>
								</div>
							</div>
						</FadeInSection>
					</div>
				</div>
			</section>

			{/* Verbal vs Non-verbal Communication */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
				<div className="max-w-7xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								Verbal vs Non-verbal Communication
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Understanding the full spectrum of human expression
							</p>
						</div>
					</FadeInSection>

					<div className="grid lg:grid-cols-2 gap-12">
						<FadeInSection delay={0.2}>
							<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl">
								<div className="flex items-center mb-6">
									<Volume2 className="w-10 h-10 text-blue-600 mr-4" />
									<h3 className="text-2xl font-bold text-gray-800">
										Verbal Communication
									</h3>
								</div>
								<p className="text-gray-600 leading-relaxed mb-6">
									Verbal communication encompasses all spoken and written words.
									It's the conscious, deliberate expression of thoughts, ideas,
									and emotions through language. This includes not just what we
									say, but how we say it—our tone, pace, volume, and choice of
									words.
								</p>
								<div className="space-y-4">
									<div className="flex items-start">
										<CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
										<div>
											<h4 className="font-semibold text-gray-800">
												Spoken Words
											</h4>
											<p className="text-gray-600 text-sm">
												Face-to-face conversations, phone calls, presentations,
												and speeches
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
										<div>
											<h4 className="font-semibold text-gray-800">
												Written Communication
											</h4>
											<p className="text-gray-600 text-sm">
												Emails, letters, reports, texts, and social media
												messages
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
										<div>
											<h4 className="font-semibold text-gray-800">
												Vocal Elements
											</h4>
											<p className="text-gray-600 text-sm">
												Tone, pace, volume, and emphasis that give meaning to
												words
											</p>
										</div>
									</div>
								</div>
							</div>
						</FadeInSection>

						<FadeInSection delay={0.4}>
							<div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl">
								<div className="flex items-center mb-6">
									<Eye className="w-10 h-10 text-purple-600 mr-4" />
									<h3 className="text-2xl font-bold text-gray-800">
										Non-verbal Communication
									</h3>
								</div>
								<p className="text-gray-600 leading-relaxed mb-6">
									Non-verbal communication is the silent language that speaks
									volumes. Research shows that 55% of communication is body
									language, 38% is tone of voice, and only 7% is actual words.
									This makes non-verbal cues incredibly powerful in human
									interaction.
								</p>
								<div className="space-y-4">
									<div className="flex items-start">
										<CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
										<div>
											<h4 className="font-semibold text-gray-800">
												Body Language
											</h4>
											<p className="text-gray-600 text-sm">
												Posture, gestures, facial expressions, and physical
												positioning
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
										<div>
											<h4 className="font-semibold text-gray-800">
												Facial Expressions
											</h4>
											<p className="text-gray-600 text-sm">
												The universal language of emotions expressed through our
												faces
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
										<div>
											<h4 className="font-semibold text-gray-800">
												Personal Space
											</h4>
											<p className="text-gray-600 text-sm">
												Proxemics—how we use space to communicate comfort and
												boundaries
											</p>
										</div>
									</div>
								</div>
							</div>
						</FadeInSection>
					</div>

					<FadeInSection delay={0.6}>
						<div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-3xl text-white">
							<h3 className="text-2xl font-bold mb-4">
								The Power of Alignment
							</h3>
							<p className="text-lg leading-relaxed">
								The most powerful communication happens when verbal and
								non-verbal messages align perfectly. When your words, tone, and
								body language tell the same story, you create trust,
								authenticity, and deep connection. Misalignment, however,
								creates confusion and can undermine even the most
								well-intentioned messages.
							</p>
						</div>
					</FadeInSection>
				</div>
			</section>

			{/* Active Listening Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								The Art of Active Listening
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								True listening is a gift we give to others and ourselves
							</p>
						</div>
					</FadeInSection>

					<div className="grid lg:grid-cols-3 gap-8 mb-12">
						<SkillCard
							icon={Ear}
							title="Full Attention"
							description="Active listening begins with giving your complete, undivided attention to the speaker. This means putting away distractions, making eye contact, and being fully present in the moment."
							delay={0.1}
						/>
						<SkillCard
							icon={Heart}
							title="Empathetic Understanding"
							description="Listen not just to the words, but to the emotions, concerns, and needs behind them. Try to understand the speaker's perspective without immediately judging or formulating your response."
							delay={0.2}
						/>
						<SkillCard
							icon={MessageCircle}
							title="Reflective Responses"
							description="Show that you're listening by reflecting back what you've heard, asking clarifying questions, and summarizing key points. This confirms understanding and shows respect for the speaker."
							delay={0.3}
						/>
					</div>

					<FadeInSection delay={0.4}>
						<div className="bg-white p-8 rounded-3xl shadow-lg">
							<h3 className="text-2xl font-bold text-gray-800 mb-6">
								The Listening Process
							</h3>
							<p className="text-gray-600 leading-relaxed mb-8">
								Active listening is a skill that can be developed through
								practice and mindfulness. It involves multiple stages that work
								together to create meaningful understanding and connection. Most
								people listen to respond rather than to understand, but active
								listening requires us to slow down and truly receive what's
								being shared.
							</p>

							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="text-xl font-semibold text-gray-800 mb-4">
										What Active Listeners Do:
									</h4>
									<ul className="space-y-3 text-gray-600">
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>
												Maintain appropriate eye contact and open body language
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>
												Ask open-ended questions to encourage elaboration
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>
												Paraphrase and summarize to confirm understanding
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>
												Avoid interrupting or finishing others' sentences
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>Acknowledge emotions and validate feelings</span>
										</li>
									</ul>
								</div>
								<div>
									<h4 className="text-xl font-semibold text-gray-800 mb-4">
										Communication Listening Barriers:
									</h4>
									<ul className="space-y-3 text-gray-600">
										<li className="flex items-start">
											<div className="w-5 h-5 bg-red-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
											<span>
												Preparing your rebuttal while the other person speaks
											</span>
										</li>
										<li className="flex items-start">
											<div className="w-5 h-5 bg-red-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
											<span>Making assumptions based on past experiences</span>
										</li>
										<li className="flex items-start">
											<div className="w-5 h-5 bg-red-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
											<span>Being distracted by technology or environment</span>
										</li>
										<li className="flex items-start">
											<div className="w-5 h-5 bg-red-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
											<span>
												Focusing on being right rather than understanding
											</span>
										</li>
										<li className="flex items-start">
											<div className="w-5 h-5 bg-red-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
											<span>Emotional reactions that cloud judgment</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</FadeInSection>
				</div>
			</section>

			{/* Public Speaking Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
				<div className="max-w-7xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								Mastering Public Speaking
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Transform fear into confidence and messages into movements
							</p>
						</div>
					</FadeInSection>

					<div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
						<FadeInSection delay={0.2}>
							<div>
								<h3 className="text-3xl font-bold text-gray-800 mb-6">
									From Fear to Fearless
								</h3>
								<p className="text-gray-600 leading-relaxed mb-6">
									Public speaking consistently ranks as one of people's greatest
									fears, often above death itself. Yet it's one of the most
									powerful skills you can develop. The ability to speak
									confidently in front of others opens doors to leadership,
									influence, and personal growth that few other skills can
									match.
								</p>
								<p className="text-gray-600 leading-relaxed mb-6">
									The secret to great public speaking isn't the absence of
									nervousness—it's the transformation of that nervous energy
									into passionate delivery. Every great speaker has felt the
									butterflies, but they've learned to make them fly in
									formation.
								</p>
								<p className="text-gray-600 leading-relaxed">
									Public speaking is not about perfection; it's about
									connection. When you shift your focus from yourself to your
									audience and your message, magic happens. You stop performing
									and start serving, and that's when true communication occurs.
								</p>
							</div>
						</FadeInSection>

						<FadeInSection delay={0.4}>
							<div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl">
								<Mic className="w-16 h-16 text-blue-600 mb-6" />
								<h4 className="text-xl font-bold text-gray-800 mb-4">
									The Speaker's Toolkit
								</h4>
								<div className="space-y-4">
									<div className="flex items-center">
										<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
										<span className="text-gray-700">
											Compelling opening that grabs attention
										</span>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
										<span className="text-gray-700">
											Clear structure with logical flow
										</span>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
										<span className="text-gray-700">
											Stories and examples that resonate
										</span>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
										<span className="text-gray-700">
											Confident body language and voice
										</span>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
										<span className="text-gray-700">
											Memorable closing with call to action
										</span>
									</div>
								</div>
							</div>
						</FadeInSection>
					</div>

					<FadeInSection delay={0.6}>
						<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-3xl text-white">
							<h3 className="text-2xl font-bold mb-6">
								The 5 Pillars of Powerful Speaking
							</h3>
							<div className="grid md:grid-cols-5 gap-6">
								<div className="text-center">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl font-bold">1</span>
									</div>
									<h4 className="font-bold mb-2">Preparation</h4>
									<p className="text-sm opacity-90">
										Know your content inside and out
									</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl font-bold">2</span>
									</div>
									<h4 className="font-bold mb-2">Practice</h4>
									<p className="text-sm opacity-90">
										Rehearse until it becomes natural
									</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl font-bold">3</span>
									</div>
									<h4 className="font-bold mb-2">Presence</h4>
									<p className="text-sm opacity-90">
										Be fully engaged in the moment
									</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl font-bold">4</span>
									</div>
									<h4 className="font-bold mb-2">Passion</h4>
									<p className="text-sm opacity-90">
										Speak from the heart with conviction
									</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl font-bold">5</span>
									</div>
									<h4 className="font-bold mb-2">Purpose</h4>
									<p className="text-sm opacity-90">
										Have a clear message worth sharing
									</p>
								</div>
							</div>
						</div>
					</FadeInSection>
				</div>
			</section>

			{/* Conflict Resolution Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								Conflict Resolution
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Turning disagreements into opportunities for deeper
								understanding
							</p>
						</div>
					</FadeInSection>

					<div className="relative">
						<div className="absolute z-[-10] left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 to-purple-300 transform -translate-x-1/2 hidden lg:block"></div>

						<TimelineItem
							icon={Handshake}
							title="Acknowledge the Conflict"
							description="The first step in resolving any conflict is acknowledging that it exists. Avoiding or ignoring conflicts only allows them to fester and grow. Recognition creates the foundation for resolution."
							isLeft={false}
							delay={0.1}
						/>

						<TimelineItem
							icon={Ear}
							title="Listen to All Perspectives"
							description="Give each party the opportunity to share their viewpoint without interruption. Practice active listening to understand not just what is being said, but the emotions and needs underlying the conflict."
							isLeft={true}
							delay={0.2}
						/>

						<TimelineItem
							icon={Heart}
							title="Find Communication Ground"
							description="Look for shared values, goals, or interests that both parties can agree upon. This creates a foundation of unity from which to build solutions and reminds everyone of their shared humanity."
							isLeft={false}
							delay={0.3}
						/>

						<TimelineItem
							icon={Target}
							title="Focus on Solutions"
							description="Shift the conversation from blame and past grievances to future-focused problem-solving. Ask 'How can we move forward?' rather than 'Who is at fault?' This redirects energy toward constructive outcomes."
							isLeft={true}
							delay={0.4}
						/>

						<TimelineItem
							icon={CheckCircle}
							title="Agree on Next Steps"
							description="End the resolution process with clear, actionable agreements. Define what each party will do differently and establish follow-up mechanisms to ensure the resolution sticks and relationships are repaired."
							isLeft={false}
							delay={0.5}
						/>
					</div>

					<FadeInSection delay={0.6}>
						<div className="mt-16 bg-white p-8 rounded-3xl shadow-lg">
							<h3 className="text-2xl font-bold text-gray-800 mb-6">
								The Emotional Intelligence Factor
							</h3>
							<p className="text-gray-600 leading-relaxed mb-6">
								Conflict resolution is as much about managing emotions as it is
								about solving problems. When people are upset, angry, or
								frustrated, their ability to think rationally and communicate
								effectively diminishes. Successful conflict resolution requires
								high emotional intelligence—the ability to recognize,
								understand, and manage emotions in yourself and others.
							</p>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="text-xl font-semibold text-gray-800 mb-4">
										De-escalation Techniques:
									</h4>
									<ul className="space-y-3 text-gray-600">
										<li className="flex items-start">
											<Star className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
											<span>Lower your voice and speak slowly</span>
										</li>
										<li className="flex items-start">
											<Star className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
											<span>Acknowledge the other person's feelings</span>
										</li>
										<li className="flex items-start">
											<Star className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
											<span>
												Use "I" statements to express your perspective
											</span>
										</li>
										<li className="flex items-start">
											<Star className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
											<span>Take breaks when emotions run too high</span>
										</li>
									</ul>
								</div>
								<div>
									<h4 className="text-xl font-semibold text-gray-800 mb-4">
										Building Trust:
									</h4>
									<ul className="space-y-3 text-gray-600">
										<li className="flex items-start">
											<Star className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>Be transparent about your intentions</span>
										</li>
										<li className="flex items-start">
											<Star className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>Follow through on commitments made</span>
										</li>
										<li className="flex items-start">
											<Star className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>Admit when you're wrong or have made mistakes</span>
										</li>
										<li className="flex items-start">
											<Star className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
											<span>
												Show genuine care for the other person's wellbeing
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</FadeInSection>
				</div>
			</section>

			{/* Communication in Relationships and Workplaces */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
				<div className="max-w-7xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								Communication in Different Contexts
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Adapting your communication style for maximum impact in every
								relationship
							</p>
						</div>
					</FadeInSection>

					<div className="grid lg:grid-cols-2 gap-12">
						<FadeInSection delay={0.2}>
							<div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-3xl h-full">
								<div className="flex items-center mb-6">
									<Heart className="w-10 h-10 text-red-500 mr-4" />
									<h3 className="text-2xl font-bold text-gray-800">
										Personal Relationships
									</h3>
								</div>
								<p className="text-gray-600 leading-relaxed mb-6">
									Communication in personal relationships requires
									vulnerability, empathy, and patience. Whether with family,
									friends, or romantic partners, these connections thrive on
									authenticity and emotional intelligence.
								</p>

								<h4 className="text-lg font-semibold text-gray-800 mb-4">
									Key Principles:
								</h4>
								<div className="space-y-4 mb-6">
									<div className="flex items-start">
										<div className="w-3 h-3 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-800">
												Emotional Safety
											</h5>
											<p className="text-gray-600 text-sm">
												Create an environment where people feel safe to express
												their true feelings without judgment
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="w-3 h-3 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-800">
												Quality Time
											</h5>
											<p className="text-gray-600 text-sm">
												Give your full attention during conversations, putting
												away distractions
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="w-3 h-3 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-800">
												Consistent Check-ins
											</h5>
											<p className="text-gray-600 text-sm">
												Regularly ask how your loved ones are feeling and what
												they need from you
											</p>
										</div>
									</div>
								</div>

								<div className="bg-white p-6 rounded-2xl">
									<h5 className="font-bold text-gray-800 mb-3">
										Communication Relationship Communication Mistakes:
									</h5>
									<ul className="text-sm text-gray-600 space-y-2">
										<li>
											• Assuming you know what the other person is thinking
										</li>
										<li>
											• Bringing up past grievances during current discussions
										</li>
										<li>• Using absolute language like "always" and "never"</li>
										<li>
											• Trying to win arguments instead of finding solutions
										</li>
									</ul>
								</div>
							</div>
						</FadeInSection>

						<FadeInSection delay={0.4}>
							<div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl h-full">
								<div className="flex items-center mb-6">
									<Briefcase className="w-10 h-10 text-blue-500 mr-4" />
									<h3 className="text-2xl font-bold text-gray-800">
										Professional Environments
									</h3>
								</div>
								<p className="text-gray-600 leading-relaxed mb-6">
									Workplace communication requires professionalism, clarity, and
									strategic thinking. Success depends on your ability to convey
									ideas effectively, build consensus, and maintain positive
									relationships with colleagues at all levels.
								</p>

								<h4 className="text-lg font-semibold text-gray-800 mb-4">
									Key Principles:
								</h4>
								<div className="space-y-4 mb-6">
									<div className="flex items-start">
										<div className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-800">
												Clarity and Conciseness
											</h5>
											<p className="text-gray-600 text-sm">
												Respect others' time by being clear, direct, and
												well-organized in your communication
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-800">
												Professional Tone
											</h5>
											<p className="text-gray-600 text-sm">
												Maintain professionalism while still being authentic and
												approachable
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
										<div>
											<h5 className="font-semibold text-gray-800">
												Strategic Thinking
											</h5>
											<p className="text-gray-600 text-sm">
												Consider the broader impact of your communications on
												team dynamics and goals
											</p>
										</div>
									</div>
								</div>

								<div className="bg-white p-6 rounded-2xl">
									<h5 className="font-bold text-gray-800 mb-3">
										Professional Communication Skills:
									</h5>
									<ul className="text-sm text-gray-600 space-y-2">
										<li>• Giving and receiving constructive feedback</li>
										<li>• Leading effective meetings and presentations</li>
										<li>• Negotiating and finding win-win solutions</li>
										<li>• Managing difficult conversations diplomatically</li>
									</ul>
								</div>
							</div>
						</FadeInSection>
					</div>

					<FadeInSection delay={0.6}>
						<div className="mt-12 bg-gradient-to-r from-green-500 to-teal-600 p-8 rounded-3xl text-white">
							<h3 className="text-2xl font-bold mb-6">
								Universal Communication Principles
							</h3>
							<p className="text-lg leading-relaxed mb-6">
								While the context may change, certain principles of effective
								communication remain constant across all relationships and
								situations. These foundational elements create the bedrock of
								meaningful human connection.
							</p>
							<div className="grid md:grid-cols-3 gap-6">
								<div>
									<h4 className="font-bold mb-2">Respect</h4>
									<p className="text-sm opacity-90">
										Honor others' perspectives, time, and boundaries in every
										interaction
									</p>
								</div>
								<div>
									<h4 className="font-bold mb-2">Authenticity</h4>
									<p className="text-sm opacity-90">
										Be genuine while adapting appropriately to different
										contexts
									</p>
								</div>
								<div>
									<h4 className="font-bold mb-2">Intentionality</h4>
									<p className="text-sm opacity-90">
										Communicate with purpose and consider the impact of your
										words
									</p>
								</div>
							</div>
						</div>
					</FadeInSection>
				</div>
			</section>
			<div className="py-20 bg-white">
				<VideoSection />
			</div>

			{/* Tips to Improve Communication */}
			<section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								Practical Tips to Improve Your Communication
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Daily practices and strategies to become a more effective
								communicator
							</p>
						</div>
					</FadeInSection>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
						<SkillCard
							icon={TrendingUp}
							title="Practice Daily"
							description="Communication is a skill that improves with practice. Engage in meaningful conversations daily, join speaking clubs, or practice in front of a mirror. Every interaction is an opportunity to grow."
							delay={0.1}
						/>
						<SkillCard
							icon={MessageCircle}
							title="Ask Better Questions"
							description="Transform surface-level conversations into meaningful exchanges by asking open-ended questions that invite deeper sharing. Questions like 'How did that make you feel?' open doors to connection."
							delay={0.2}
						/>
						<SkillCard
							icon={Eye}
							title="Read Body Language"
							description="Develop your ability to read non-verbal cues. Pay attention to facial expressions, posture, and gestures. This awareness helps you respond more appropriately to others' emotional states."
							delay={0.3}
						/>
						<SkillCard
							icon={Heart}
							title="Develop Empathy"
							description="Put yourself in others' shoes before responding. Try to understand their perspective, challenges, and emotions. Empathy is the bridge that connects hearts and minds."
							delay={0.4}
						/>
						<SkillCard
							icon={Target}
							title="Be Clear and Concise"
							description="Respect others' time by organizing your thoughts before speaking. Use simple, clear language and get to the point while still being warm and engaging."
							delay={0.5}
						/>
						<SkillCard
							icon={CheckCircle}
							title="Follow Up"
							description="Great communication doesn't end when the conversation does. Follow up on commitments, check in on people's wellbeing, and maintain the connections you've built."
							delay={0.6}
						/>
					</div>

					<FadeInSection delay={0.7}>
						<div className="bg-white p-8 rounded-3xl shadow-lg">
							<h3 className="text-2xl font-bold text-gray-800 mb-6">
								The 30-Day Communication Challenge
							</h3>
							<p className="text-gray-600 leading-relaxed mb-8">
								Transform your communication skills with this progressive 30-day
								challenge. Each week focuses on a different aspect of
								communication, building upon previous skills to create lasting
								improvement.
							</p>

							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
									<div className="text-2xl font-bold text-blue-600 mb-2">
										Week 1
									</div>
									<h4 className="font-bold text-gray-800 mb-3">
										Active Listening
									</h4>
									<ul className="text-sm text-gray-600 space-y-2">
										<li>• Practice full attention in every conversation</li>
										<li>• Ask one clarifying question per discussion</li>
										<li>• Summarize what you heard before responding</li>
									</ul>
								</div>

								<div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
									<div className="text-2xl font-bold text-green-600 mb-2">
										Week 2
									</div>
									<h4 className="font-bold text-gray-800 mb-3">
										Non-Verbal Awareness
									</h4>
									<ul className="text-sm text-gray-600 space-y-2">
										<li>• Monitor your body language</li>
										<li>• Maintain appropriate eye contact</li>
										<li>• Practice open, welcoming postures</li>
									</ul>
								</div>

								<div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
									<div className="text-2xl font-bold text-purple-600 mb-2">
										Week 3
									</div>
									<h4 className="font-bold text-gray-800 mb-3">
										Emotional Intelligence
									</h4>
									<ul className="text-sm text-gray-600 space-y-2">
										<li>• Identify emotions before reacting</li>
										<li>• Practice empathy in difficult situations</li>
										<li>• Use "I" statements to express feelings</li>
									</ul>
								</div>

								<div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
									<div className="text-2xl font-bold text-orange-600 mb-2">
										Week 4
									</div>
									<h4 className="font-bold text-gray-800 mb-3">
										Advanced Skills
									</h4>
									<ul className="text-sm text-gray-600 space-y-2">
										<li>• Practice conflict resolution</li>
										<li>• Give constructive feedback</li>
										<li>• Lead a difficult conversation</li>
									</ul>
								</div>
							</div>
						</div>
					</FadeInSection>
				</div>
			</section>

			{/* Inspirational Quote Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<FadeInSection>
						<Quote className="w-16 h-16 mx-auto mb-8 opacity-50" />
						<blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8">
							"The art of communication is the language of leadership. When we
							master our ability to connect with others, we unlock the power to
							inspire, influence, and create positive change in the world."
						</blockquote>
						<cite className="text-xl opacity-75">- Maya Angelou (adapted)</cite>
					</FadeInSection>
				</div>
			</section>

			{/* Contact/Feedback Form */}
			<section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<FadeInSection>
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-6">
								Continue Your Journey
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								We'd love to hear about your communication experiences and help
								you on your journey to better connections
							</p>
						</div>
					</FadeInSection>

					<div className="grid lg:grid-cols-2 gap-12">
						<FadeInSection delay={0.2}>
							<div className="bg-white p-8 rounded-3xl shadow-lg">
								<h3 className="text-2xl font-bold text-gray-800 mb-6">
									Share Your Thoughts
								</h3>
								{isSubmitted ? (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										className="text-center py-8"
									>
										<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
										<h4 className="text-xl font-bold text-gray-800 mb-2">
											Thank You!
										</h4>
										<p className="text-gray-600">
											Your message has been received. We appreciate your
											feedback!
										</p>
									</motion.div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-semibold text-gray-700 mb-2"
											>
												Your Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-semibold text-gray-700 mb-2"
											>
												Email Address
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="message"
												className="block text-sm font-semibold text-gray-700 mb-2"
											>
												Your Message
											</label>
											<textarea
												id="message"
												name="message"
												value={formData.message}
												onChange={handleInputChange}
												rows={5}
												className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
												placeholder="Share your communication challenges, successes, or questions..."
												required
											></textarea>
										</div>
										<motion.button
											type="submit"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:shadow-lg transition-all"
										>
											Send Message <Send className="ml-2 w-5 h-5" />
										</motion.button>
									</form>
								)}
							</div>
						</FadeInSection>

						<FadeInSection delay={0.4}>
							<div className="space-y-8">
								<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl">
									<h3 className="text-2xl font-bold text-gray-800 mb-6">
										Connect With Us
									</h3>
									<div className="space-y-4">
										<div className="flex items-center">
											<Mail className="w-6 h-6 text-blue-600 mr-4" />
											<div>
												<div className="font-semibold text-gray-800">Email</div>
												<div className="text-gray-600">
													hamzasyrage@gmail.com
												</div>
											</div>
										</div>
										<div className="flex items-center">
											<Phone className="w-6 h-6 text-blue-600 mr-4" />
											<div>
												<div className="font-semibold text-gray-800">Phone</div>
												<div className="text-gray-600">+963 941 845 197</div>
											</div>
										</div>
									</div>
								</div>

								<div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl">
									<h3 className="text-xl font-bold text-gray-800 mb-4">
										Next Steps
									</h3>
									<ul className="space-y-3 text-gray-600">
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
											<span>Practice one skill from this guide daily</span>
										</li>
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
											<span>Join a local speaking or communication group</span>
										</li>
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
											<span>
												Seek feedback from trusted friends or colleagues
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
											<span>Consider professional communication coaching</span>
										</li>
									</ul>
								</div>
							</div>
						</FadeInSection>
					</div>
				</div>
			</section>
			<QuizModal
				isOpen={showQuiz}
				onClose={() => {
					setShowQuiz(false);
				}}
			/>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => {
					setShowQuiz(true);
				}}
				className="mx-auto my-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center cursor-pointer"
			>
				Take a Quiz <ArrowRight className="ml-2 w-5 h-5" />
			</motion.button>
			{/* Footer */}
			<footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="text-center">
						<div className="flex items-center justify-center mb-6">
							<MessageCircle className="w-8 h-8 text-blue-400 mr-2" />
							<span className="text-2xl font-bold">
								The Art of Communication Skills
							</span>
						</div>
						<p className="text-gray-400 mb-6 max-w-2xl mx-auto">
							Empowering individuals and organizations to build stronger
							connections through the art of communication.
						</p>
						<div className="border-t border-gray-700 pt-6">
							<p className="text-gray-500">
								© 2025 CommSkills. All rights reserved. | Made with ❤️ for
								better communication
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
