class graphNode
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}
class graphEdge
{
    constructor(v1,v2,weight)
    {
        this.v1 = v1;
        this.v2 = v2;
        this.weight = weight;
    }
}
let numberOfNodes = 0;


let nodes = [];
let displayNodes = [];
let edges = [];
let displayEdges =[];
let nodesPlaced = false;
let edgesEntered = false;
let edgesCreated = false;



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
    // console.log(centreY);
    // console.log(centreY);
    // let textBox = document.createElement('h4');
    // let coordinates = document.createTextNode(`x: ${centreX} y : ${centreY}`);
    // textBox.append(coordinates);
    // document.body.appendChild(textBox);

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
    console.log("hello");
    
    for(let i =0; i< numberOfNodes;i++)
    {
        
        numberingCell = document.createElement('th');
        numbering = document.createTextNode(`${i}`);
        numberingCell.appendChild(numbering);
        topRow.appendChild(numberingCell);
    }
    
    
    for(let i =0;i<numberOfNodes;i++)
    {
        console.log(i);
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
    submitButton = document.createElement('button');
    submitButton.appendChild(document.createTextNode('Submit Matrix'));
    submitButton.setAttribute('id', 'submit-matrix-btn');
    submitButton.setAttribute('onclick','createEdges()');
    edgeForm.appendChild(submitButton);

}
function createEdges()
{
    if(edgesCreated) return;
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
            //console.log(currentCell);
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


                
                
                edgesSVG.appendChild(newLineEdge);
                displayEdges.push(newLineEdge);

                let newEdge= new graphEdge(i,j,adjacencyMatrix[i][j]);
                edges.push(newEdge);
            }
        }
    }
}