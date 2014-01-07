var connect = require('connect'),
	optimus = require('../'),
	assets = __dirname + '/assets';

var app = connect();
app.use(optimus(assets));
app.use(connect.static(assets));

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

});