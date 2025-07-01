import { AlertCircle, Award, Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "../types/type";
import { useState } from "react";
const quizQuestions: QuizQuestion[] = [
	{
		id: 1,
		question:
			"According to the article, what percentage of communication is attributed to body language?",
		options: ["7%", "38%", "55%", "75%"],
		correctAnswer: 2,
		explanation:
			"Research cited in the article shows that 55% of communication is body language, 38% is tone of voice, and only 7% is actual words.",
	},
	{
		id: 2,
		question:
			"What is described as 'the silent language that speaks volumes' in communication?",
		options: [
			"Verbal cues",
			"Written messages",
			"Non-verbal communication",
			"Vocal elements",
		],
		correctAnswer: 2,
		explanation:
			"The article describes non-verbal communication (body language, facial expressions, personal space) as the silent language that speaks volumes.",
	},
	{
		id: 3,
		question:
			"Which element is NOT part of the active listening process described in the article?",
		options: [
			"Full attention",
			"Reflective responses",
			"Immediate judgment",
			"Empathetic understanding",
		],
		correctAnswer: 2,
		explanation:
			"Active listening requires suspending immediate judgment. The three key components are full attention, empathetic understanding, and reflective responses.",
	},
	{
		id: 4,
		question:
			"What is the first step in conflict resolution according to the article?",
		options: [
			"Find common ground",
			"Listen to perspectives",
			"Focus on solutions",
			"Acknowledge the conflict",
		],
		correctAnswer: 3,
		explanation:
			"The article states that acknowledging the conflict is the foundational first step in resolution.",
	},
	{
		id: 5,
		question:
			"Which of these is considered a vocal element of verbal communication?",
		options: [
			"Facial expressions",
			"Personal space",
			"Tone and pace",
			"Written reports",
		],
		correctAnswer: 2,
		explanation:
			"Vocal elements include tone, pace, volume and emphasis that give meaning to words.",
	},
	{
		id: 6,
		question:
			"What is the recommended approach when shifting to solutions in conflict resolution?",
		options: [
			"Assigning blame",
			"Focusing on past grievances",
			"Future-focused problem solving",
			"Establishing winners/losers",
		],
		correctAnswer: 2,
		explanation:
			"The article advises shifting to future-focused problem-solving by asking 'How can we move forward?'",
	},
	{
		id: 7,
		question:
			"Which communication element is described as 'the universal language of emotions'?",
		options: [
			"Personal space",
			"Written communication",
			"Facial expressions",
			"Vocal tone",
		],
		correctAnswer: 2,
		explanation:
			"Facial expressions are described as the universal language of emotions.",
	},
	{
		id: 8,
		question:
			"What completes the statement: 'Communication is the bridge between...'?",
		options: [
			"sender and receiver",
			"confusion and clarity",
			"words and actions",
			"isolation and connection",
		],
		correctAnswer: 1,
		explanation:
			"The article opens with: 'Communication is the bridge between confusion and clarity'.",
	},
	{
		id: 9,
		question:
			"Which technique demonstrates active listening according to the article?",
		options: [
			"Multitasking while listening",
			"Reflecting back what you've heard",
			"Finishing the speaker's sentences",
			"Taking minimal notes",
		],
		correctAnswer: 1,
		explanation:
			"Reflective responses - showing you're listening by reflecting back what you've heard - demonstrate active listening.",
	},
	{
		id: 10,
		question:
			"What does the article identify as the final step in conflict resolution?",
		options: [
			"Finding shared values",
			"Listening to perspectives",
			"Agreeing on next steps",
			"Acknowledging emotions",
		],
		correctAnswer: 2,
		explanation:
			"The resolution process ends with agreeing on clear, actionable next steps with follow-up mechanisms.",
	},
];
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

export default QuizModal;
