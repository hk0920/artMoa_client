
import $ from 'jquery';
import axios from 'axios';

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
		"X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
	},
	withCredentials:true
});

api.interceptors.request.use(
	config=>{
		if(getCookie("accessToken") !== null){
			config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
		}
		return config;
	},
	error=>{
		return Promise.reject(error);
	}
)

export const onLogin = (username, password)=>{
	let form = new FormData();
	form.append("username", username);
	form.append("password", password);
	
	api.post("/httpApi/member/login/action", form).then((res)=>{
		console.log(res);
		if(res.data.code === "LGN"){
			setCookie("id", username);
			onLoginSuccess(res);
		}else{
			alert("아이디, 비밀번호가 일치하지 않습니다.");
		}
	}).catch((error)=>{
		console.log(error);
	})
}

export const onLoginRefresh=()=>{
	const token = getCookie("accessToken");

	api.post("/httpApi/member/reissue").then((res)=>{
		console.log("갱신");
		const token = res.data.data.tokenInfo.accessToken;
		const tokenExpire = res.data.data.tokenInfo.accessTokenExpires;

		setCookie("accessToken", token, tokenExpire, 1800)
	}).catch((error)=>{
		console.log(error.response);
	})
}

export const onLoginSuccess=(res)=>{
	const token = res.data.tokenInfo.accessToken;
	const tokenExpire = res.data.tokenInfo.accessTokenExpires;

	setCookie("accessToken", token, tokenExpire, 1800);

	document.location.href = "/";
}

export const setCookie=(name, value, expire, maxAge)=>{
	let cookieText = name + "=" + value;
	cookieText += (expire?"; expires=" + expire:"");
	cookieText += (maxAge?"; max-age=" + maxAge:"");

	document.cookie = cookieText;
}

export const getCookie=(name)=>{
	let cookieVal = null;

	if(document.cookie){
		const array = document.cookie.split(name +"=");
		if(array.length >= 2){
			const arraySub = array[1].split(";");
			cookieVal = arraySub[0];
		}
	}

	return cookieVal;
}

export const deleteCookie=(name)=>{
	document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
}

export const emailValidation=(email)=>{
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	let result;

	if(!regExp.test(email)){
		result = {
			type:"error",
			msg:"이메일 형식이 올바르지 않습니다.",
			boolean:false
		}
	}else{
		result = {
			type:"error",
			msg:"",
			boolean:true
		}
	}

	return result;
}

export const pwdValidation=(pwd)=>{
	var regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,24}$/;
	let result;

	if(!regExp.test(pwd)) {
		if(pwd === "") {
			result = {
				type:"error",
				msg:"비밀번호를 입력해주세요."
			}
		}else{
			result = {
				type:"error",
				msg:"비밀번호 형식이 일치하지 않습니다."
			}
		}
	}else{
		result = {
			type:"success",
			msg:""
		}
	}

	return result;
}

export const birthValidation=(birthday)=>{
	var regExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
	var numRegExp = /[^0-9]/;
	let result = {
		type:"",
		msg:""
	};

	if(!regExp.test(birthday)){
		if(numRegExp.test(birthday)){
			result = {
				type:"error",
				msg:"문자열이 포함되어있습니다.숫자만 입력해주세요."
			}
		}
	}else{
		result = {
			type:"success",
			msg:""
		}
	}

	return result;
}