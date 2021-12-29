
/*
Variable naming convention: <object>_<action>_<objectname>; Example -> Button_click_b1;
*/
nonrandom = false;
var searchnum = -1;
//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
var array_speed=document.getElementById('a_speed').value;

var butts_algos=document.querySelectorAll(".algos button");
var cus_num=document.getElementById("custom_number");
var cus_num2=document.getElementById("custom_number2");

var div_sizes=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";

// Array generation and updation.

inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);
if(cus_num)
    cus_num.addEventListener("click",numcus);
if(cus_num2)    
    cus_num2.addEventListener("click",numcus2);


// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// ctx.beginPath();
// ctx.rect(20, 20, 135, 30);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.fillStyle = "black"; 
// ctx.font = "15px Arial Bold";
// ctx.fillText("Searching for", 30, 40);

// var c = document.getElementById("myCanvas2");
// var ctx = c.getContext("2d");
// ctx.beginPath();
// ctx.rect(20, 20, 150, 30);
// ctx.fillStyle = "yellow";
// ctx.fill();
// ctx.fillStyle = "black"; 
// ctx.font = "15px Arial Bold";
// ctx.fillText("Currently on", 30, 40);



function generate_array()
{
    cont.innerHTML="";
    array_size=inp_as.value;
    div_sizes=[];
    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 2.5*(inp_as.max - inp_as.min) ) + 10;
        divs[i]=document.createElement("div");
        divs[i].innerHTML="<center>"+div_sizes[i]+"</center>";
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:blue; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
    nonrandom=false;
}


function update_array_size()
{
    array_size=inp_as.value;
    generate_array();
}

window.onload=update_array_size();

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}

function numcus(){    


    let numval = prompt("Please enter the numbers","");

    if(numval){
        var myArray = [];
        cont.innerHTML="";
        myArray = numval.split(" ");
        var numArray = [];
        for(let i = 0;i<myArray.length;i++){
           if(parseInt(myArray[i])>0){
            numArray.push(parseInt(myArray[i])); }
          
                    }
      
    }          
    array_size=numArray.length;

    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=numArray[i];
        divs[i]=document.createElement("div");
        divs[i].innerHTML="<center>"+div_sizes[i];
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:blue; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function numcus2(){    


    let numval = prompt("Please enter the numbers","");

    let numval2 = prompt("Please enter the number to search ","");
    searchnum=parseInt(numval2);
    console.log(searchnum);
    nonrandom = true;

    if(numval){
        var myArray = [];
        cont.innerHTML="";
        myArray = numval.split(" ");
        var numArray = [];
        for(let i = 0;i<myArray.length;i++){
           if(parseInt(myArray[i])>0){
            numArray.push(parseInt(myArray[i])); }
          
                    }
      
    }          
    array_size=myArray.length;
    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=numArray[i];
        divs[i]=document.createElement("div");
        divs[i].innerHTML="<center>"+div_sizes[i];
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:blue; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}


function runalgo()
{
    disable_buttons();

    this.classList.add("butt_selected");
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
	    case "sel":sel();
		            	break;
        case "binS":bins();
    	            	break;   
                           
                                 
    }
}

function goBack() {
    window.history.back();
  }