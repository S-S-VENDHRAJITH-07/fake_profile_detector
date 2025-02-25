export default function AnalysisResult({ result }) {
  return (
    <div className="mt-6 p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">🔬 Analysis Result</h2>
      <p className="text-lg mt-2">
        Probability of being a fake profile:{" "}
        <span className="font-bold text-red-500">{result.probability}%</span>
      </p>
    </div>
  );
}
