import React from 'react';
import {ChildList} from "./modules/FileNode";
import {useNodeState} from "./modules/FileNode";
import {Layout} from "./components/Layout";

function App() {
  const nodeState = useNodeState({initialPath: ""})

  return (
      <Layout header={<div>GoDrop</div>}>
          <div className="h-full flex flex-row">
              <div className="flex-grow" style={{background: "red"}}>
                  <ChildList state={nodeState} />
              </div>
              <div style={{background: "green"}}>
                  Side bar
              </div>
          </div>
      </Layout>
  );
}

export default App;
