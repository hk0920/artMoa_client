
import $ from 'jquery';

export const headerStyle=()=>{
	if(!$("#cBody").hasClass("main") && $(".detail-wrap").length === 0){
		$("#header").addClass("white-type");
	}else{
		$("#header").removeClass("white-type");
	}
}