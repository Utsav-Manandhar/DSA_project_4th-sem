class graphNode
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.status = 0;
    }
}
class graphEdge
{
    constructor(v1,v2,weight)
    {
        this.v1 = v1;
        this.v2 = v2;
        this.weight = weight;
        this.status = 0;
    }
}
let numberOfNodes = 0;
let numberOfEdges =0;
let totalWeight =0;


let prims = false;
let nodes = [];
let displayNodes = [];
let edges = [];
let edgeWeightTexts = [];
let displayEdges =[];


let nodesPlaced = false;
let edgesEntered = false;
let edgesCreated = false;
let algorithmExecuted = false;
let vertexFound  = true;



function createSVGwindow()
{
    
    mainDisplayObject = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mainDisplayObject.setAttribute('id','main-display');
    mainDisplayObject.setAttribute('onclick','insertGraphNode(event)');
   
    nodesSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    nodesSVG.setAttribute('id','nodesSVG');

    edgesSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    edgesSVG.setAttribute('id','edgesSVG');

    
    document.body.appendChild(mainDisplayObject);
    mainDisplayObject.appendChild(edgesSVG);
    mainDisplayObject.appendChild(nodesSVG);
    
}



function insertGraphNode(event)
{
    if(nodesPlaced) return;
    centreX = event.clientX - (screen.width-1200)/2;
    centreY = event.clientY - 30 ;
    let newCircleNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newCircleNode.setAttribute('class','graph-node');
    newCircleNode.setAttribute('r', '20');
    newCircleNode.setAttribute('cx', `${centreX}`);
    newCircleNode.setAttribute('cy', `${centreY}`);
    nodesSVG.appendChild(newCircleNode);
    displayNodes.push(newCircleNode);

    
    nodeNumber = document.createElementNS('http://www.w3.org/2000/svg','text');
    nodeNumber.setAttribute('x',`${centreX-4.5}`);
    nodeNumber.setAttribute('y',`${centreY+5}`);
    nodeNumber.appendChild(document.createTextNode(`${numberOfNodes}`));
    nodeNumber.setAttribute('fill','white');

    nodesSVG.appendChild(nodeNumber);




    let newNode = new graphNode(centreX, centreY);
    nodes.push(newNode);

    numberOfNodes++;
    
}

function inputAdjacencyMatrix()
{
    if(numberOfNodes<4){
        window.alert("Please enter more nodes");
        return
    }
    if(edgesEntered) return;
    else edgesEntered = true;
    if(!nodesPlaced) nodesPlaced = true;
    
    
    
    
    edgeForm = document.createElement('div');
    edgeForm.setAttribute('id','input-form');
    document.body.appendChild(edgeForm);

    edgeTable = document.createElement('table');
    edgeForm.appendChild(edgeTable);

    topRow = document.createElement('tr');
    edgeTable.appendChild(topRow);
    topRow.appendChild(document.createElement('th'));
    
    for(let i =0; i< numberOfNodes;i++)
    {
        
        numberingCell = document.createElement('th');
        numbering = document.createTextNode(`${i}`);
        numberingCell.appendChild(numbering);
        topRow.appendChild(numberingCell);
    }
    
    
    for(let i =0;i<numberOfNodes;i++)
    {
        newRow = document.createElement('tr');
        
        numberingCell = document.createElement('th');
        numbering = document.createTextNode(`${i}`);
        numberingCell.appendChild(numbering);
        newRow.appendChild(numberingCell);
        for(let j=0;j<numberOfNodes;j++)
        {
            newCell = document.createElement('td');
            if(i<j)
            {
                inputSpace = document.createElement('input');
                inputSpace.setAttribute('id',`${i},${j}`);
                inputSpace.setAttribute('class', 'input-cell');
                inputSpace.setAttribute('type','number');
                inputSpace.setAttribute('min','0');
                inputSpace.setAttribute('step','1');
                newCell.appendChild(inputSpace);
            }
            newRow.appendChild(newCell);
            
        }
        edgeTable.appendChild(newRow);
    }
}
function createEdges()
{
    if(edgesCreated || !edgesEntered) return;
    else edgesCreated = true;
    adjacencyMatrix = [...Array(numberOfNodes)].map(e => Array(numberOfNodes).fill(0));
    for(let i=0;i<numberOfNodes;i++)
    {
        for(let j = i+1;j<numberOfNodes;j++)
        {
            
            currentCell = document.getElementById(`${i},${j}`);
            if(currentCell.value.length!=0)
            {
                adjacencyMatrix[i][j]= currentCell.value;
            }
        }
    }

    

    
    
    for(let i=0;i<numberOfNodes;i++)
    {
        for(let j = i+1;j<numberOfNodes;j++)
        {
            if(adjacencyMatrix[i][j]>0){
                let newLineEdge = document.createElementNS('http://www.w3.org/2000/svg','line');
                newLineEdge.setAttribute('class', 'graph-edge');
                newLineEdge.setAttribute('x1',`${nodes[i].x}`);
                newLineEdge.setAttribute('y1',`${nodes[i].y}`);
                newLineEdge.setAttribute('x2',`${nodes[j].x}`);
                newLineEdge.setAttribute('y2',`${nodes[j].y}`);
                
                textX= (nodes[i].x+nodes[j].x)/2 + 8;
                textY= (nodes[i].y+nodes[j].y)/2 - 8;
                edgeWeight = document.createElementNS('http://www.w3.org/2000/svg','text');
                edgeWeight.setAttribute('x',`${textX}`);
                edgeWeight.setAttribute('y',`${textY}`);
                edgeWeight.appendChild(document.createTextNode(`${adjacencyMatrix[i][j]}`));
                edgeWeight.setAttribute('fill','blue');
                edgesSVG.appendChild(edgeWeight);
                edgeWeightTexts.push(edgeWeight);


                numberOfEdges++;


                
                
                edgesSVG.appendChild(newLineEdge);
                displayEdges.push(newLineEdge);

                let newEdge= new graphEdge(i,j,adjacencyMatrix[i][j]);
                edges.push(newEdge);
            }
        }
    }
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function parentOf( n )
{
    if(parents[n].value ==-1) return n;
    return  parents[n].value = parentOf(parents[n].value);
}

function union( a, b)
{
    let x = parentOf(a);
    let y = parentOf(b);
    if(x!=y)
    {
        if(parents[x].rank < parents[y].rank)
        {
            parents[x].value = y;
        }
        else if(parents[x].rank > parents[y].rank)
        {
            parents[y].value = x;
        }
        else
        {
            parents[y].value = x;
            parents[x].rank++;
        }
    }
}

async function executeAlgorithm()
{
    if(algorithmExecuted || !edgesCreated) return;
    else algorithmExecuted = true;

    let algo = document.querySelector('input[name="algorithm"]:checked');
    console.log(algo.value);
    if(algo.value == "Prim's")
    {
        scanningNode = 0;
        nodes[0].status = 1;
        displayNodes[0].setAttribute('fill','orange');
        numberOfVisitedNodes = 1;
        currentEdges = [];
        await sleep(1000);
        while(numberOfVisitedNodes<numberOfNodes && vertexFound)
        {
            vertexFound = false;
            
            for(let i = 0; i<numberOfEdges;i++)
            {
                
                if((edges[i].v1 == scanningNode || edges[i].v2==scanningNode)&& edges[i].status==0)
                {
                    
                    let edgeObject = {e: edges[i], w: edges[i].weight , index:i}
                    edges[i].status = 1;
                    displayEdges[i].style.stroke = "blue";
                    await sleep(200);
                    currentEdges.push(edgeObject);
                    

                }
            }
            await sleep(1000);
            
            currentEdges.sort((a,b)=>{return a.w - b.w});
            for(let i =0;i<currentEdges.length;i++)
            {
                if(nodes[currentEdges[i].e.v1].status==1)
                {
                    scanningNode = currentEdges[i].e.v2;
                }
                else
                {
                    scanningNode = currentEdges[i].e.v1;
                }


                if(nodes[scanningNode].status==0)
                {
                    vertexFound = true;
                    displayNodes[scanningNode].setAttribute('fill', 'orange');
                    nodes[scanningNode].status = 1;
                    displayEdges[currentEdges[i].index].style.stroke = "black";
                    edges[currentEdges[i].index].status = 2;
                    totalWeight += +currentEdges[i].w;
                    currentEdges.splice(i,1);
                    numberOfVisitedNodes++;
                    
                    await sleep(1000);
                    
                    break;
                }

            }
        
        }
        
        
    }
    else
    {
        parents = [];
        for(let i =0;i<numberOfNodes;i++)
        {
            let parentObject = {value:-1, rank:1};

            parents.push(parentObject);
        }
        currentEdges = [];
        numberOfEdgesAdded = 0;
        for(let i = 0; i<numberOfEdges;i++)
            {  
                let edgeObject = {e: edges[i], w: edges[i].weight , index:i}
                currentEdges.push(edgeObject);
            }
        currentEdges.sort((a,b)=>{return a.w - b.w});
        for(let i = 0; i<numberOfEdges;i++)
        {
            let firstVertex = currentEdges[i].e.v1;
            let secondVertex = currentEdges[i].e.v2;
            if(parentOf(firstVertex)!=parentOf(secondVertex))
            {
                displayNodes[firstVertex].setAttribute('fill', 'orange');
                nodes[firstVertex].status = 1;
                displayNodes[secondVertex].setAttribute('fill', 'orange');
                nodes[secondVertex].status = 1;
                displayEdges[currentEdges[i].index].style.stroke = "black";
                edges[currentEdges[i].index].status = 2;
                totalWeight += +currentEdges[i].w;
                numberOfEdgesAdded++;

                await sleep(500);

                union(firstVertex, secondVertex);
                
            }


        }
        
    }
    for(let i = 0; i<edges.length;i++)
        {
            if(edges[i].status!=2)
            {
                displayEdges[i].style.visibility = "hidden";
                edgeWeightTexts[i].style.visibility = "hidden";
            }
        }
        console.log(totalWeight);
}