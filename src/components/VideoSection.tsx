import { Clock, Play, X } from "lucide-react";
import { useState } from "react";

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
										className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
									>
										<X size={16} />
										Close Video
									</button>
								) : (
									<button
										onClick={() => setActiveVideo(video.id)}
										className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
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

export default VideoSection;
