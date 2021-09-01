import React from 'react';
import {ChildList} from "./modules/FileNode";
import {useNodeState} from "./modules/FileNode";
import {Layout} from "./components/Layout";
import {SideDrawer} from "./components/SideDrawer";
import {Header} from "./components/Header";

function App() {
  const nodeState = useNodeState({initialPath: ""})

  return (
      <Layout header={<Header />}>
          <div className="h-full flex flex-row bg-neutralBgSofter text-onNeutralBgSofter">
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
