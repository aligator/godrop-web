import React from 'react';
import {ChildList} from "./modules/FileNode";
import {useNodeState} from "./modules/FileNode";
import {Layout} from "./components/Layout";

function App() {
  const nodeState = useNodeState({initialPath: ""})

  return (
      <Layout header={<div>GoDrop</div>}>
          <div className="h-full flex flex-row">
              <div className="flex-grow">
                  <ChildList state={nodeState} />
              </div>
              <div>
                  Side bar
              </div>
          </div>
      </Layout>
  );
}

export default App;
