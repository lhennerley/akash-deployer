import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TreeEntry } from '../pages';


type MarketplaceAppType = {
    appFiles: TreeEntry[];
};

const MarketplaceAppDeploy = (props: MarketplaceAppType) => {
    const manifest = props.appFiles.find(af => af.type == "blob" && af.name.endsWith(".yaml"))
    const readme = props.appFiles.find(af => af.type == "blob" && af.name.endsWith(".md"))
    const markdown = readme.object.text;

    return (
        <div>
            {/* <article className="prose">
                <ReactMarkdown children={markdown} />
            </article> */}
        </div>
    );
};

export default MarketplaceAppDeploy;