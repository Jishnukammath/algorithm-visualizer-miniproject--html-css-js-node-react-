function bins()
{   

    var temp;
    for(var i=0;i<array_size-1;i++)
    {
        for(var j=0;j<array_size-i-1;j++)
        {

            if(div_sizes[j]>div_sizes[j+1])
            {

                var temp=div_sizes[j];
                div_sizes[j]=div_sizes[j+1];
                div_sizes[j+1]=temp;

            }
        }
    }

    c_delay=0;
    if(nonrandom==false){
        rand_pos=Math.floor(Math.random()*array_size);
        }
        else{
            
            for(var i=0;i<array_size;i++){
                console.log(div_sizes[i]+ " "+searchnum);
                if(div_sizes[i]==searchnum){
                    rand_pos=i;
                    
                }
            }
        }
    document.getElementById("Info_Cont2").innerHTML = "Searching...."; 
    for(var i=0;i<array_size;i++){
		divs[i].style=" margin:0% " + margin_size + "%; background-color:blue; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[    i]) + "%;";
	}
	div_update(divs[rand_pos],div_sizes[rand_pos],"red");
    left = 0;
    right = array_size ;
    while(left < right)
    {
        console.log("left "+left);
        console.log("right "+right);
        z = parseInt(left)+parseInt(right);
        mid = Math.floor((z)/2) ;
        console.log("mid "+mid);
	    i=mid;
        if(i==rand_pos){
            console.log("res "+i);
		    div_update(divs[i],div_sizes[i],"green");
		   break;
	    }
        	
        div_update(divs[i],div_sizes[i],"yellow");//Color update
	    div_update(divs[i],div_sizes[i], "blue");//Color update
        if(mid > rand_pos)
        {
            right = mid;
        }
        if(mid < rand_pos)
        {
            left = mid;
        } 
	    
    }
    	elf()
	enable_buttons();
}
function elf()
{
	window.setTimeout(function(){

	document.getElementById("Info_Cont2").innerHTML = "Element found";
	},c_delay+=delay_time);
}
