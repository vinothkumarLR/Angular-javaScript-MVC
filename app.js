var app = angular.module('myapp', []);

app.directive('donut',
		function() {
			return {
				restrict : 'E',
				templateUrl : 'templates/donut.html',
				controller : function($scope, donutFactory) {
					console.log("inside controller");
					var canvas = document.getElementById("chart");
					var ctx = canvas.getContext("2d");
					function drawdonutChart(canvas) {

						this.x, this.y, this.radius, this.lineWidth,
								this.strockStyle, this.from, this.to = null;
						this.set = function(x, y, radius, from, to, lineWidth,
								strockStyle) {
							this.x = x;
							this.y = y;
							this.radius = radius;
							this.from = from;
							this.to = to;
							this.lineWidth = lineWidth;
							this.strockStyle = strockStyle;
						};

						this.draw = function(data) {
							canvas.beginPath();
							canvas.lineWidth = this.lineWidth;
							canvas.strokeStyle = this.strockStyle;
							canvas.arc(this.x, this.y, this.radius, this.from,
									this.to);
							canvas.stroke();

							var numberOfParts = data.numberOfParts;
							var parts = data.parts.pt;
							var colors = data.colors.cs;
							var df = 0;
							for ( var i = 0; i < numberOfParts; i++) {
								canvas.beginPath();

								canvas.strokeStyle = colors[i];
								canvas.arc(this.x, this.y, this.radius, df, df
										+ (Math.PI * 2) * (parts[i] / 100));
								canvas.stroke();
								df += (Math.PI * 2) * (parts[i] / 100);
							}
						};
					}
					var drawDonut = new drawdonutChart(ctx);
					drawDonut.set(250, 250, 75, 0, Math.PI * 2, 30, "#fff");
					drawDonut.draw(donutFactory.data);

				},
				link : function postLink(scope, iElement, iAttrs) {
					console.log("inside post link");
				}
			};
		});

app.factory('donutFactory', function() {

	var factory = {};

	factory.data = {
		numberOfParts : 6,
		parts : {
			"pt" : [ 29.5, 0.5, 34.5, 0.5, 34.5, 0.5 ]
		},// percentage of each parts
		colors : {
			"cs" : [ "red", "white", "green", "white", "blue", "white" ]
		}
	// color of each part
	};

	return factory;

});
