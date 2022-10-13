import Calculator from "./component/calculator/calculator";

import ParticlesBg from "particles-bg";

const App = () => {
  return (
    <div>
      {/* <ParticlesBg type="circle" bg={true} /> */}
      <h1 className="header">CALCULATOR</h1>
      <Calculator />
    </div>
  );
};

export default App;
