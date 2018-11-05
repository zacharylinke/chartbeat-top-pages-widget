
  function zlChartbeatWidget() {

    this.apiKey   = '';
    this.base     = '//api.chartbeat.com';
    this.data     = null;
    this.epType   = 'Live';
    this.host     = '';
    this.options  = {};
    this.path     = '/live/toppages/v3/';
    this.selector = null;

    /**
     * Init widget
     */
    this.init = function(selector, apiKey, host, options) {
      var self = this;
      if (typeof selector !== 'string' ||
          typeof apiKey !== 'string' ||
          typeof host !== 'string')
        return false;
      else {
        this.selector = selector;
        this.apiKey = apiKey;
        this.host = host;
      }

      this.setOptions(options);
      this.getRequest();
      if (this.options.realtime) {
        window.setInterval(function() {
          self.getRequest();
        }, 3000);
      }
    };

    /**
     * Set options for the widget
     */
    this.setOptions = function(options) {
      var self = this,
          default_options = {
            count: 10,
            realtime : true,
            type: 'Live - Top Pages',
            title: 'Concurrent Users / Top Pages'
          };

      options = options || {};
      for (var opt in default_options)
        if (default_options.hasOwnProperty(opt) && !options.hasOwnProperty(opt))
            options[opt] = default_options[opt];
      if (!options.realtime && options.title === 'Concurrent Users / Top Pages')
        options.title = 'Current Top Pages';
      this.options = options;
    };

    /**
     * Build the request url
     */
    this.buildUrl = function() {
      var url = this.base + this.path + '?apikey=' + this.apiKey + '&host=' + this.host;
      return url;
    };

    /**
     * Send GET request
     */
    this.getRequest = function() {
      var self = this,
          url  = this.buildUrl(),
          xhr  = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          self.data = JSON.parse(xhr.responseText);
          self.displayResults();
        }
        else {
          alert('Request failed.  Returned status of ' + xhr.status);
        }
      };
      xhr.send();
    };

    /**
     * Display final widget html
     */
    this.displayResults = function() {
      if (this.options.type === 'Live - Top Pages') {
        var template    = this.templateListItem(),
            items       = this.createList().join(''),
            itemsWrap   = '<div>'+items+'</div>',
            static      = !this.options.realtime ? 'static' : '';
            widgetTitle = this.options.title ? '<h3 class="widget-title">' + this.options.title + '</h3>' : '';
            widget      = '<div class="zl-chartbeat-widget ' + static + '">' + widgetTitle + itemsWrap + '</div>';
        document.getElementById(this.selector).innerHTML = widget;
      }
    };

    /**
     * Create a list of chartbeat data results
     */
    this.createList = function() {
      var count = 0,
          self  = this,
          items = [],
          title = '';
      this.data.pages.forEach(function(element) {
        if (count < self.options.count) {
          title = element.title.replace(/\|.*/, '');
          items.push(self.templateListItem()
            .replace(/{{path}}/g, element.path)
            .replace(/{{people}}/g, element.stats.people)
            .replace(/{{title}}/g, title)
          );
          count ++;
        }
      });
      return items;
    };

    /**
     * HTML markup for list item
     */
    this.templateListItem = function() {
      var people = this.options.realtime ? '<span class="cell people">{{people}}</span>' : '',
        template =
        '<a href="https://www.{{path}}" class="row" target="_blank">'+
          people+
          '<span class="cell title">{{title}}</span>'+
        '</a>';
      return template;
    };
  }
