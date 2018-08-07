;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	function createPieChart(id) {
		// Chart holder DOM Element
		var container = document.getElementById(id);
		var $container = d3.select('#' + id);

		// Chart data is taken from the "data-source" attribute of the DOM element
		var data = JSON.parse(container.getAttribute('data-source'));
		
		// Chart dimensions
		// Pie charts are usually visualized as a circle 
		// That is why width and height are now a single value
		var dimensions = 216;
		var radius = dimensions / 2;

		// Chart layout using D3 pie layout
		var pie = d3.layout.pie()
			.sort(null);

		// Make the donut 46 pixels thick
		var arc = d3.svg.arc()
			.innerRadius(radius - 46)
			.outerRadius(radius);

		// Append the Legend
		var legend = $container.append('div')
			.attr('class', 'chart-legend')

		// Create the SVG
		var svg = $container
			.append('svg')
			.attr({
				'class': 'pie-graph',
				'width': dimensions,
				'height': dimensions
			})
				.append('g')
				.attr({
					'class': 'pie-canvas',
					'transform': 'translate(' + (dimensions / 2) + ',' + (dimensions / 2) + ')'
				});

		// Populate empty variables iterating over the chart data array
		var legendMarkup = ''; 
		var colors = [];
		var values = [];

		for ( var i = 0; i < data.length; i++ ) {
			values.push(data[i].value); // Will be used when creating the pie sectors

			colors.push(data[i].color); // Will set a color to each pie sector

			// Generate the legend markup
			legendMarkup += '<p><span class="chart-legend-icon" style="background-color: ' + data[i].color + '"></span>' + data[i].label + '\n';
		};

		legend.html(legendMarkup);

		var slices = svg.selectAll('.pie-slice')
			.data(pie(values))
			.enter()
			.append('g')
				.attr('class', 'pie-slice');

		// Create the pie sectors
		slices
			.append('path')
			.attr({
				'class': 'pie-chunk',
				'fill': function(d, i) {
					return colors[i];
				},
				'd': arc
			});

		// Create a label for each sector
		// The label shows the value of the sector
		slices.append('text')
			.attr({
				'transform': function(d) {
					d.outerRadius = radius + 30;
					d.innerRadius = radius + 45;

					return 'translate(' +  arc.centroid(d) + ')';
				},
				'dy': '.35em'
			})
			.text(function(d) {
				return d.value + '%';
			});

		// Toggle sector labels when mouse over the legend
		$(container)
			.on('mouseenter', '.chart-legend p', function(event) {
				var idx = $(this).index();

				d3.selectAll('.pie-slice')
					.attr('class', function(d, i) {
						if ( i === idx ) {
							return 'pie-slice hovered';
						} else {
							return 'pie-slice';
						};
					});
			})
			.on('mouseleave', '.chart-legend p', function(event) {
				d3.selectAll('.pie-slice').attr('class', 'pie-slice');
			});
	};

	$doc.ready(function() {
		if( $('.an-item').length ) {
			$('.an-item').each(function() {
				if( $(this).find('.an-item-illust').length ) {
					$(this).find('.an-item-illust').wrap('<div class="an-item-illust-outer"></div>');
				} else {
					if( $(this).hasClass('.an-item-prev') ) {
						$('<div class="an-item-illust-outer"></div>').prependTo($(this));
					} else {
						$('<div class="an-item-illust-outer"></div>').appendTo($(this));							
					}
				}
			});
		}

		// Accordion
		$('.accordion-head').on('click', function(event) {
			$(this).parent().toggleClass('accordion-expanded');
			$(this).siblings('.accordion-body').slideToggle();

			$(this).parent().siblings().removeClass('accordion-expanded');
			$(this).parent().siblings().find('.accordion-body').slideUp();
		});

		if( $('.counter').length ) {
			$('.counter-value').counterUp({
				delay: 10,
	        	time: 1500
			});
		}

		if ( $('#pieChart').length ) {
			createPieChart('pieChart');
		};
			
       // Home slider event

		if( $('.section-events ul').length ) {
			$('<div class="slider-events-paging"></div>').appendTo('.section-events'); 

			$('<div class="slider-events-prev"><i class="ico-prev"></i></div>').appendTo('.section-events'); 
			$('<div class="slider-events-next"><i class="ico-next"></i></div>').appendTo('.section-events'); 
			
			$('.section-events ul').carouFredSel({
				circular: true,
				infinite: true,
				responsive: true,
				auto: {
					play: true,
					timeoutDuration: 7000					
				},
				scroll: {
//					easing: "linear", 
					duration: 750
				},
				swipe: {
					onTouch: true
				},
				pagination: {
					container: '.slider-events-paging',
					anchorBuilder: true
				},
				prev: {
					button: '.slider-events-prev'
				},
				next: {
					button: '.slider-events-next'
				}
			});
		}

		//  News Slider
		if( $('.front .block-page.list-articles').length ) {
			var $newsSlider = $('#zone4 .la-slider').clone().removeAttr('style');
			$('#zone4 .la-slider').detach();				
			$newsSlider.appendTo('.front #zone4 .list-articles');

			$('<div class="slider-news-paging"></div>').insertAfter('#zone4 .la-slider'); 

			$('#zone4 .la-slider .la-item > img').wrap('<div class="la-item-image"></div>');

			$('#zone4 .la-slider .la-item img').each(function() {
				var url = $(this).attr('src');

				$(this).parent().css('background-image', 'url(' + url + ')');
			});

			$('#zone4 .la-slider .slider-content').carouFredSel({
				circular: true,
				infinite: true,
				responsive: true,
				auto: {
					play: true,
					timeoutDuration: 5000					
				},
				scroll: {
					fx: 'crossfade',
					duration: 750
				},
				swipe: {
					onTouch: true
				},
				pagination: {
					container: '.slider-news-paging',
					anchorBuilder: true
				}
			});
		}
	});

})(jQuery, window, document);
