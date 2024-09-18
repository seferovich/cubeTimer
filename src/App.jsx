import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Scrambow } from "scrambow";
import Scramble from "./components/Scramble";
import Stopwatch from "./components/Stopwatch";
function App() {
  const threebythree = new Scrambow()

  const [scramble, setScramble] = useState(threebythree.get(1))

  
  
  const newScramble = () => {
    setScramble(threebythree.get(1))
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <Navbar />
      <Scramble scramble={scramble} />
      <Stopwatch getNewScramble={newScramble} />
    </div>
  );
}

export default App;
