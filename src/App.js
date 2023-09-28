import "./App.css";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Badge } from "antd";

function App() {
  const [output, setOutput] = useState([]);
  const [value, setValue] = useState("");
  const [pageFrame, setPageFrame] = useState("");
  const [priorityQueue, setPriorityQueue] = useState([]);
  const [totalHit, setTotalHit] = useState(0);
  const [referenceString, setReferenceString] = useState("");

  const checkHit = () => {
    for (let i = 0; i < priorityQueue.length; i++) {
      if (priorityQueue[i].value === value) {
        setTotalHit(totalHit + 1);
        priorityQueue[i].counter++;
        setPriorityQueue([...priorityQueue]);
        return true;
      }
    }
    return false;
  };

  const handleMiss = () => {
    if (priorityQueue.length === parseInt(pageFrame)) {
      let minimum = priorityQueue[0].counter;
      let leastFrequentlyUsed = 0;
      priorityQueue.forEach((item, index) => {
        if (item.counter <= minimum) {
          minimum = item.counter;
          leastFrequentlyUsed = index;
        }
      });
      priorityQueue.splice(leastFrequentlyUsed, 1);
    }
    setPriorityQueue([{ value: value, counter: 1 }, ...priorityQueue]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkHit()) {
      toast.success("Hit!");
    } else {
      toast.error("Miss!", { duration: 1700 });
      handleMiss();
    }
    setReferenceString(referenceString + " " + value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPriorityQueue([]);
    setOutput([]);
    setTotalHit(0);
    setReferenceString("");
    setValue("");
    setPageFrame("");
  };

  useEffect(() => {
    const updatedPriorityQueue = priorityQueue.map((item) => ({
      value: item.value,
      counter: item.counter,
    }));
    setOutput([...output, updatedPriorityQueue]);
    console.log(pageFrame);
  }, [priorityQueue]);

  return (
    <div className="text-center" style={{ marginTop: "14vh" }}>
      <h1>REFERENCE STRING</h1>
      <h1 className="p-2 mx-2" style={{ minHeight: "10vh", width: "auto" }}>
        {referenceString}
      </h1>
      <div className="mb-3 ">
        <div className="container mb-3" style={{ width: "20%" }}>
          <form onSubmit={handleSubmit}>
            <label className="form-label h4">Enter Number of Page Frame</label>
            <input
              type="number"
              style={{ width: "20%" }}
              className="form-control mx-auto mb-3 "
              value={pageFrame}
              onChange={(e) => setPageFrame(e.target.value)}
              required={true}
            />
          </form>
          <form onSubmit={handleSubmit}>
            <label className="form-label h4">Enter a Reference Number</label>
            <input
              type="number"
              style={{ width: "20%" }}
              className="form-control mx-auto mb-3 "
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required={true}
            />
            <div>
              <button type="submit" className=" btn btn-primary mb-3 p-2">
                ENTER
              </button>
              <button
                type="reset"
                className="mx-3 btn btn-danger mb-3 p-2"
                onClick={handleReset}
              >
                CLEAR
              </button>
            </div>
          </form>
          <h5 className="mb-3">
            {`Hit Ratio: ${totalHit}/${output.length - 1}`}
          </h5>
        </div>
        <div className="mb-3 mx-5 d-flex ">
          {output.map((row, rowIndex) => (
            <div className="mb-3 px-2" key={rowIndex}>
              {row.map((item, colIndex) => (
                <div key={colIndex}>
                  <Badge
                    count={item.counter}
                    showZero
                    offset={[0, 50]}
                    color="#1065e3ba"
                  >
                    <h2 className="border p-2">{item.value}</h2>
                  </Badge>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
