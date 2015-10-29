var React = require('react');
var Main = require('./components/Main');
var ReactDom = require('react-dom');

Values = {

	categoryDetails : [{
			categoryName : "Microservices",
			categoryImage : "images/microservices-icon.svg"
		},{
			categoryName : "API/Open Data",
			categoryImage : "images/api.svg"
		},{
			categoryName : "Big Data",
			categoryImage : "images/big-data-icon.svg"
	}],
	verticalDetails : [{
			categoryName : "Healthcare",
			categoryImage : "images/noun_148183_cc.svg"
		},{
			categoryName : "Financial Services",
			categoryImage : "images/noun_139819_cc.svg" 
		},{
			categoryName : "National Security",
			categoryImage : "images/noun_8293_cc.svg"
		},{
			categoryName : "Intelligence Community",
			categoryImage : "images/noun_122_cc.svg"
	}],
	carousalDetails : [{
			carousalId : 0,
			carousalClassName  : "active",
			carousalImage : "images/splash-img.png",
			carousalTitle : "OLABS DIGITAL SHOWCASE",
			carousalSubTitle : "Sub Heading Text Place Holder"

		},{
			carousalId : 1,
			carousalClassName : "",
			carousalImage : "images/splash-img.png",
			carousalTitle : "Test Carousel Content 2.."
		},{
			carousalId : 2,
			carousalClassName : "",
			carousalImage : "images/splash-img.png",
			carousalTitle : "Test Carousel Content 3.."
	}],
	cardDetails : [{
			cardImage : "images/inflo.png",
			featured : true,
			cardTitle : "Inflo",
			carousalSubTitle : "Sub Heading Text Place Holder",
			carousalImage : "images/inflo-splash-bg.png",
			cardSubtitle : "Location Data",
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]  
		},{
			cardImage : "images/medcheck-thumb.png",
			cardTitle : "MedCheck",
			featured : true,
			carousalSubTitle : "Sub Heading Text Place Holder",
			carousalImage : "images/MedCheck-splash-bg.png",
			cardSubtitle : "Check Once, Choose Once",
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]		
		},{
			cardImage : "images/refusalCheck-thumb.png",
			cardTitle : "RefusalCheck",
			cardSubtitle : "FDA Drug and Product Refusals Visualized",
			featured : false,
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]
		},{
			cardImage : "images/Lumify-thumb.png",
			cardTitle : "Lumify",
			cardSubtitle : "Sub Title",
			featured : false,
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]	
		},{
			cardImage : "images/placeholder-thumb.png",
			cardTitle : "App Name",
			cardSubtitle : "Sub Title",
			featured : false,
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]	
		},{
			cardImage : "images/placeholder-thumb.png",
			cardTitle : "App Name",
			cardSubtitle : "Sub Title",
			featured : false,
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]	
		},{
			cardImage : "images/placeholder-thumb.png",
			cardTitle : "App Name",
			cardSubtitle : "Sub Title",
			featured : false,
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]	
		},{
			cardImage : "images/placeholder-thumb.png",
			cardTitle : "App Name",
			cardSubtitle : "Sub Title",
			featured : false,
			cardCategory : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nibh porttitor, accumsan purus id, vulputate mauris. Morbi egestas massa et mi placerat iaculis.",
			likes : 230,
			views : 2600,
			cardProblem : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardSolution : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			cardBenefits : "This is the problem statement. Is sums up the problem that was solved by creating this app.",
			categoryIcons : [{
					categoryImage : "images/HTML5_Badge.png",
					categoryTitle : "HTML5"
				},{
					categoryImage : "images/css3-Badge.png",
					categoryTitle : "CSS3"
				},{
					categoryImage : "images/angularjs-logo.png",
					categoryTitle : "AngularJS"
			}]	
		}]

};

var Element = React.createElement(Main,Values);
ReactDom.render(Element, document.querySelector('.starter'));
