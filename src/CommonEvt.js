
import $ from 'jquery';

export const headerStyle=()=>{
	if(!$("#cBody").hasClass("main") && $(".detail-wrap").length === 0){
		$("#header").addClass("white-type");
	}else{
		$("#header").removeClass("white-type");
	}
}

export const imgSizeEvt=(target)=>{
	$(target).each(function(){
		if($(this).find("img").width() * $(this).height() < $(this).find("img").height() * $(this).width()){
			$(this).find("img").width($(this).width());
			$(this).find("img").height("auto");
		}else{
			$(this).find("img").width("auto");
			$(this).find("img").height($(this).height());
		}
	});
}

export const changeListTypeEvt=(target)=>{
	$(target).siblings().removeClass("active");
	$(target).addClass("active");

	const str = target.className.split("-");

	if(str[0] === "card"){
		$(target).parents(".list-div").find(".list").removeClass("board-type").addClass("card-type");
	}else{
		$(target).parents(".list-div").find(".list").removeClass("card-type").addClass("board-type");
	}
	imgSizeEvt();
}

export const axios=(url, )=>{
	// axios.get('/api' + url, {
	// 	headers:{
	// 		"X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA",
	// 	}
	// }).then(res=>{
	// 	console.log(res.data.data.list);
	// 	const dataSet = res.data.data.list;
	// 	setArtData(dataSet);
	// }).catch(error=>{
	// 	console.log("에러" + error);
	// });
}