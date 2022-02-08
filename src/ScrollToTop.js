import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";

const ScrollToTop=()=>{
	const {pathname} = useLocation();

	useEffect(()=>{
		window.scrollTo(0, 0);
		setTimeout(() => {
			if($(".sub-vis").length > 0) {
				$(".sub-vis").addClass("active");
			}
		}, 10);
	},[pathname]);

	return null;
}

export default ScrollToTop;