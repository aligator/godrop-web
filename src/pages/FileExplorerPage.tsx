import React from 'react';
import {Header} from "../components/Header";
import {SideDrawer} from "../components/SideDrawer";
import {ChildList, useNodeState} from "../modules/FileNode";
import {Layout} from "../components/Layout";
import {UploadButton} from "../modules/FileNode/UploadButton";

interface Props {
}

export const FileExplorerPage: React.FC<Props> = ({}) => {
    const selectedNode = useNodeState({initialPath: ""})

    return (
        <Layout header={<Header />}>
            <div className="h-full flex flex-row bg-neutralBgSofter text-onNeutralBgSofter">
                <SideDrawer>
                    <div className="flex-grow">
                        <ChildList state={selectedNode} />
                    </div>
                </SideDrawer>
                <UploadButton state={selectedNode} />
            </div>
        </Layout>
    )
};

