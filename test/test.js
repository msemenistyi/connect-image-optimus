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

});