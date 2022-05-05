function $g (selector)
{
    let nodeList = document.querySelectorAll(selector);

    if(nodeList.length==0)
        return null

    else if (nodeList.length == 1)
        return nodeList[0]
        
    else 
        return nodeList
}

function $c (tagName)
{
    return document.createElement(tagName)
}

function $a (fatherNode,sonNode)
{
    fatherNode.appendChild(sonNode);
}

export{$g,$c,$a};