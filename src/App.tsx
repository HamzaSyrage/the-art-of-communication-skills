import { motion } from "framer-motion";
import {
	MessageCircle,
	Users,
	Ear,
	Heart,
	TrendingUp,
	ArrowRight,
	Quote,
	Send,
	CheckCircle,
	Eye,
	Volume2,
	Handshake,
	Target,
	Mail,
	Phone,
} from "lucide-react";
import React, { useState } from "react";
import QuizModal from "./components/QuizModal";
import VideoSection from "./components/VideoSection";
import FadeInSection from "./components/FadeInSection";
import SkillCard from "./components/SkillCard";
import TimelineItem from "./components/TimelineItem";

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
			<section
				id="home"
				className="flex justify-center items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 h-screen"
			>
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
			<section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
				</div>
			</section>

			<div className="py-20 bg-white">
				<VideoSection />
			</div>

			{/* Inspirational Quote Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="max-w-4xl mx-auto text-center ">
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
							Hamza Syrage
							<br /> Nabil Mahmah
							<br /> Nour Addin Serdar Khan Alafghani
							<br /> Mohamad Moustafa
						</p>
						<div className="border-t border-gray-700 pt-6">
							<p className="text-gray-500">
								© 2025 The Art of Communication Skills. All rights reserved. |
								Made with ❤️ for better communication
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
