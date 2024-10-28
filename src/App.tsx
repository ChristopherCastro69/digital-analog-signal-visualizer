import "./index.css"; // Ensure this line is present
import SignalVisualizer from "./components/SignalVisualizer";
function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* <h1 className="text-4xl font-bold text-blue-600">Hello World</h1> */}
      <SignalVisualizer />
    </div>
  );
}

export default App;
