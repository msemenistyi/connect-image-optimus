var connect = require('connect'),
	optimus = require('../'),
	assets = __dirname + '/assets';

var app = connect();
app.use(optimus(assets));
app.use(connect.static(assets));

var  uaIE8 = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)',
  uaIE11 = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
  uaChrome22 = 'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4',
  uaChrome23 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.6 Safari/537.11',
  uaAndroid2v3 = 'Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', 
  uaAndroid4v0 =  'Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
  uaOpera12v0 = 'Opera/12.0(Windows NT 5.1;U;en)Presto/22.9.168 Version/12.00',
  uaOpera12v14 = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0) Opera 12.14';

describe('connect.image-optimus', function(){

  it('should serve static files 1', function(done){
    app.request()
    .get('/text.txt')
    .expect('some text', done);
  });

  it('should serve static files 2', function(done){
    app.request()
    .get('/doc.html')
    .expect('<!doctype html>', done);
  });

  it('should not do anything when .jpg is met within querystring', function(done){
    app.request()
    .get('/text.txt?asdas=.jpg')
    .expect('some text', done);
  });

  it('should not do anything when .jpg is met within requested file name', function(done){
    app.request()
    .get('/text.jpg.txt')
    .expect('some text', done);
  });

  it('should not do anything when .jpg is met within querystring with Accept "image/webp"', function(done){
    app.request()
    .set('Accept', 'image/webp')
    .get('/text.txt?asdas=.jpg')
    .expect('some text', done);
  });

  it('should not do anything when .jpg is met within requested file name with Accept "image/webp"', function(done){
    app.request()
    .set('Accept', 'image/webp')
    .get('/text.jpg.txt')
    .expect('some text', done);
  });

  it('should replace jpg to webp if Accept "image/webp"', function(done){
    app.request()
    .set('Accept', 'image/webp')
    .get('/space.jpg')
    .expect('Content-Type', 'image/webp', done);
  });

  it('should not replace jpg to webp if Accept not "image/webp"', function(done){
    app.request()
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/jpeg', done);
  });

  it('should set vary:accept if content changed', function(done){
    app.request()
    .set('Accept', 'image/webp')
    .get('/space.jpg')
    .expect('Vary', 'Accept', done);
  });

  it('should not set vary:accept if content did not change', function(done){
    app.request()
    .set('Accept', '*/*')
    .get('/space.jpg')
    .not()
    .expect('Vary', 'Accept', done);
  });

  it('should not do anything if Accept is not present', function(done){
    app.request()
    .get('/space.jpg')
    .expect('Content-Type', 'image/jpeg', done);
  });

});

describe('connect.image-optimus handle UA string correct.', function(){

  it('chrome 22: jpeg/png', function(done){
    app.request()
    .set('User-Agent', uaChrome22)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/jpeg', done)
  });

  it('chrome 23: webp', function(done){
    app.request()
    .set('User-Agent', uaChrome23)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/webp', done)
  });

  it('android 2.3: jpeg/png', function(done){
    app.request()
    .set('User-Agent', uaAndroid2v3)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/jpeg', done)
  });

  it('android 4.0: webp', function(done){
    app.request()
    .set('User-Agent', uaAndroid4v0)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/webp', done)
  });

  it('opera 12.0: jpeg/png', function(done){
    app.request()
    .set('User-Agent', uaOpera12v0)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/jpeg', done)
  });

  it('opera 12.14: webp', function(done){
    app.request()
    .set('User-Agent', uaOpera12v14)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/webp', done)
  });

  it('ie 8: jpeg/png', function(done){
    app.request()
    .set('User-Agent', uaIE8)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'image/jpeg', done)
  });

  it('ie 11: jxr', function(done){
    app.request()
    .set('User-Agent', uaIE11)
    .set('Accept', '*/*')
    .get('/space.jpg')
    .expect('Content-Type', 'application/octet-stream', done)
  });

  it('ie 11: jxr', function(done){
    app.request()
    .set('User-Agent', uaIE11)
    .get('/space.jpg')
    .expect('Content-Type', 'application/octet-stream', done)
  });

});