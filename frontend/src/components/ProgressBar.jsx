const labels = [
  { text: "EXCELLENT MATCH", color: "text-green-600", description: "Your profile is an excellent match for this job. You have the skills and experience that align perfectly with the job requirements." },
  { text: "GOOD MATCH", color: "text-yellow-600", description: "Your profile is a good match for this job. You have most of the required skills and experience." },
  { text: "FAIR MATCH", color: "text-orange-600", description: "Your profile has some relevant skills, but consider gaining more experience for this role." },
  { text: "POOR MATCH", color: "text-red-600", description: "Your profile does not align well with this job. Consider improving your skills to increase your chances of getting hired." }
]

const ProgressBar = ({ percent }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md w-64 relative">
      {/* SVG Progress Ring */}
      <svg
        className="w-32 h-32 transform -rotate-90"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className="text-blue-500 transition-all duration-500 ease-out"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <span className="text-2xl font-bold text-blue-600">
        {percent}%
      </span>

      {/* Labels */}
      <p className={` text-lg font-semibold ${percent >= 90 ? labels[0].color : percent >= 75 ? labels[1].color : percent >= 60 ? labels[2].color : labels[3].color}`}>
        {percent >= 90 ? labels[0].text : percent >= 75 ? labels[1].text : percent >= 60 ? labels[2].text : labels[3].text}
      </p>
      <p className="mt-2 text-sm text-gray-600 text-center">
        {percent >= 90 ? labels[0].description : percent >= 75 ? labels[1].description : percent >= 60 ? labels[2].description : labels[3].description}
      </p>
    </div>
  );
};

export default ProgressBar;