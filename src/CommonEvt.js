
import $ from 'jquery';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

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

	const imgTarget = $(target).parents(".list-div").find(".img-div");
	imgSizeEvt(imgTarget);
}

export const api = axios.create({
	headers:{
		"X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA",
	}
})

export const onLogin=(username, password)=>{
	let form = new FormData();
	form.append("username", username);
	form.append("password", password);
	console.log(username, password);
	
	api.post("/httpApi/member/login/action", form).then((res)=>{
		console.log(res);
		if(res.data.code === "LGN"){
			onLoginSuccess();
		}else{
			alert("아이디, 비밀번호가 일치하지 않습니다.");
		}
	}).catch((error)=>{
		console.log(error);
	})
}

export const onLoginRefresh=()=>{
	let form = new FormData();
	form.append("accessToken", );
	form.append("refreshToken", );
	api.post("/httpApi/member/reissue", form).then((res)=>{
		console.log(res);
	}).catch((error)=>{
		console.log(error);
	})
}

export const onLoginSuccess=(res)=>{	
	const {accessToken} = res.data.tokenInfo.accessToken;
	api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}