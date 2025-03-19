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

	:root {
		scrollbar-gutter: stable;
	}

	html {
		font-family: "InterRegular", sans-serif;
		font-size: 62.5%;
	}

	body {
		background-color: ${(props) => props.theme.bgPrimary};
		color: ${(props) => props.theme.textPrimary};

		&:has(.modalOpen) {
			overflow: hidden;
		}
	}

	.container {
		min-width: 320px;
		max-width: 1280px;
		margin: 0 auto;
		padding: 16px;
		box-shadow: 0 0 50px 10px ${(props) => props.theme.bgSecondary};
    box-sizing: border-box;
  	
		display: flex; 
		flex-direction: column; 
		gap: 14px;

		min-height: 100vh;
		
	}

	main {
		flex-grow: 1;
	}
`;

export default GlobalStyles;
