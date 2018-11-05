var testApi = '317a25eccba186e0f6b558f45214c0e7';
var testHost = 'someecards.com';

QUnit.test( "Build Url Test", function( assert ) {
  var cbWidget = new zlChartbeatWidget();
  cbWidget.apiKey = testApi;
  cbWidget.host = testHost;
  var expectedUrl = '//api.chartbeat.com/live/toppages/v3/?apikey='+testApi+'&host='+testHost;
  assert.equal(cbWidget.buildUrl(), expectedUrl, "buildUrl function returns a chartbeat api url");
});

QUnit.test( "Set title option", function( assert ) {
  var cbWidget = new zlChartbeatWidget();
  cbWidget.init('#test', testApi, testHost, {title: "Test Widget"});
  assert.equal(cbWidget.options.title, "Test Widget", "options parameter sets title option ");
});
