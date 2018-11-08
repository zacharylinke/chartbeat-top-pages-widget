## Top Pages Chartbeat Widget
A simple JavaScript widget to display Top Pages from Chartbeat

View example display: [zacharylinke.com/chartbeat-top-pages-widget](http://zacharylinke.com/chartbeat-top-pages-widget)

### Chartbeat
To learn more about Chartbeat API and Top Pages endpoint 
- http://support.chartbeat.com/docs/api.html#toppages
- https://chartbeat.com/docs/api/explore/#endpoint=live/toppages/v3/

### Usage
1. Add css and js

```
<link rel="stylesheet" href="{your url}/zl-chartbeat-widget/css/dist/zl-chartbeat-widget.min.css">
<script src="{your url}/zl-chartbeat-widget/js/dist/zl-chartbeat-widget.min.js"></script>
```

2. Init widget

Pass in id of parent elementoptions
(Api key and host default to test values)
- DOM selector id (string)
- api key (string)
- domain of site to query {example.com} (string) 
```
<script>
var topPagesWidget = new zlChartbeatWidget();
topPagesWidget.init('widget', 'apiKey', 'host', {});
</script>
```

#### Options
**count**: The number of top pages to display. int 1-10. default 10

**realtime**: Displays and updates concurrent users every 3 seconds or just static data if false. boolean. default true

**title**: The widget title. string or falsey for no title. default title provided

### Development
SASS needs RUBY, if you don’t have RUBY, install it first from here

www.ruby-lang.org/en/documentation/installation/

Then using terminal `cd` into `zl-chartbeat-widget` and run these commands 
to compile js/css and run tests

1. `gem install sass`
2. `npm init`
3. `grunt`
