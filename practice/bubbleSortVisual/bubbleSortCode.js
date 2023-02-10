let int_arr = Array(200).fill().map(()=>Math.floor(200 * Math.random()));
let sortCount =0;
let calledOnce = false;
let objects_arr = [];

function createVisulaizer()
{
    if(calledOnce) return;
    let mainDisplayWindow = document.querySelector("#mainDisplay")
    let maxElement = int_arr.reduce((a,b) => Math.max(a,b));
    let singleWidth = (100/int_arr.length) + "%";
    for(let i=0;i<int_arr.length;i++)
    {
        let newObject = document.createElement('div');
        objects_arr.push(newObject);
        newObject.setAttribute("class" , "element");
        newObject.style.width= singleWidth;
        let numbering = document.createTextNode(String(int_arr[i]));
       // newObject.appendChild(numbering);
        let singleHeight = (int_arr[i]/maxElement)*100 + "%";
        newObject.style.height = singleHeight;
        newObject.style.order = i;


        mainDisplayWindow.append(newObject);

    }
    calledOnce= true;
}

function sortOnce(arr, n)
{
    console.log(n);
    for (let j= n+1;j<arr.length;j++)
    {
        
        if(arr[n]>arr[j])
        {
            let temp = arr[n];
            arr[n] = arr[j];
            arr[j] = temp;
            let tempObject = objects_arr[n];
            objects_arr[n] = objects_arr[j];
            objects_arr[j] = tempObject;
        }
    }
    sortCount++;
    rearrangeItems();
}
function rearrangeItems()
{
    for(let i =0; i <int_arr.length;i++)
    {
        objects_arr[i].style.order = i;
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 async function sortAll()
{
    for( let i =sortCount;i<int_arr.length;i++)
    {  
        sortOnce(int_arr, i);
        await sleep(20);
        //rearrangeItems();
        
    }
}






console.log(int_arr);