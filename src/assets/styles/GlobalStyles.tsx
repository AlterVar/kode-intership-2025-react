import InterRegular from "../../assets/fonts/Inter_18pt-Regular.ttf";
import InterMedium from "../../assets/fonts/Inter_18pt-Medium.ttf";
import InterSemiBold from "../../assets/fonts/Inter_18pt-SemiBold.ttf";
import InterBold from "../../assets/fonts/Inter_18pt-Bold.ttf";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: "InterRegular";
		src: url(${InterRegular});
		font-weight: 400;
	}

	@font-face {
		font-family: "InterMedium";
		src: url(${InterMedium});
		font-weight: 500;
	}

	@font-face {
		font-family: "InterSemiBold";
		src: url(${InterSemiBold});
		font-weight: 600;
	}

	@font-face {
		font-family: "InterBold";
		src: url(${InterBold});
		font-weight: 700;
	}
	
	* {
		margin: 0;
		padding: 0;
	}

	html {
		font-family: "InterRegular", sans-serif;
		font-size: 62.5%;
	}

	body {
		background-color: #fff;
		color: #050510;
		scrollbar-gutter: stable;

		&:has(.modalOpen) {
			overflow: hidden;
		}
	}

	.container {
		min-width: 320px;
  	padding: 16px;
		display: flex; 
		flex-direction: column; 
		gap: 14px;

		min-height: 100vh;
    box-sizing: border-box;
	}

	main {
		flex-grow: 1;
		height: 1px;
	}
`;

export default GlobalStyles;
