import React from 'react';
import {Header} from "../components/Header";
import {SideDrawer} from "../components/SideDrawer";
import {ChildList, useNodeState} from "../modules/FileNode";
import {Layout} from "../components/Layout";
import {ActionToolbar} from "../modules/FileNode/ActionToolbar";

interface Props {
}

export const FileExplorerPage: React.FC<Props> = ({}) => {
    const selectedNode = useNodeState({initialPath: ""})

    return (
        <Layout header={<Header />}>
            <ActionToolbar state={selectedNode}/>
                <div className="flex flex-row bg-base-100 text-base-content">
                <SideDrawer>
                    <div className="flex-grow">
                        <ChildList state={selectedNode} />
                    </div>
                </SideDrawer>
            </div>
        </Layout>
    )
};

