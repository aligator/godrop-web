import React from 'react';
import {ChildList} from "./modules/FileNode";
import {useNodeState} from "./modules/FileNode";
import {Layout} from "./components/Layout";
import {SideDrawer} from "./components/SideDrawer";

function App() {
  const nodeState = useNodeState({initialPath: ""})

  return (
      <Layout header={<div>GoDrop</div>}>
          <div className="h-full flex flex-row">
              <SideDrawer>
                  <div className="flex-grow">
                      <ChildList state={nodeState} />
                  </div>
              </SideDrawer>
          </div>
      </Layout>
  );
}

export default App;
