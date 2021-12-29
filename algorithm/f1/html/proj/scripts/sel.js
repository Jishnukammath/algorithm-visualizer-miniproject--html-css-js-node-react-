
function sel()
{
    flag=0;
    c_delay=0;
    if(nonrandom==false){
    rand_pos=Math.floor(Math.random()*array_size);
    }
    else{
        rand_pos=null;
        for(var i=0;i<array_size;i++){
            console.log(div_sizes[i]+ " "+searchnum);
            if(div_sizes[i]==searchnum){
                rand_pos=i;
                
            }
        }
    }
    console.log(div_sizes);
    console.log("random "+rand_pos+" "+div_sizes[rand_pos] );
    document.getElementById("Info_Cont2").innerHTML = "Searching...."; 
    for(var i=0;i<array_size;i++){
		divs[i].style=" margin:0% " + margin_size + "%; background-color:blue; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[    i]) + "%;";
	}
	div_update(divs[rand_pos],div_sizes[rand_pos],"red");
    for(var i=0;i<array_size;i++)
    {
	    if(i==rand_pos){
		    div_update(divs[i],div_sizes[i],"green");
            flag=1;
		   break;
	    }
	    	
            div_update(divs[i],div_sizes[i],"yellow");//Color update
	    div_update(divs[i],div_sizes[i], "blue");//Color update
	    
    }
    	elf1()
	enable_buttons();
    
}
function elf1()
{
	window.setTimeout(function(){
    if(flag==1){
	document.getElementById("Info_Cont2").innerHTML = "Element found";}
    else{
        document.getElementById("Info_Cont2").innerHTML = "Element not found";
    }
	},c_delay+=delay_time);
}
