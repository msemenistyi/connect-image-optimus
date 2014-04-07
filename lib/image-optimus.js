/*!
 * msemenistyi/connect-image-optimus
 * Copyright(c) 2014 Mykyta Semenistyi
 * MIT Licensed
 */

var url = require('url'),
	path = require('path'),
	fs = require('fs'),
	ua = require('useragent');
	require('useragent/features');

var dirname = __dirname;

function updateReqUrl(ext, req, res, next, pathname, extpos){
	var canBeReplaced = false,
		resultFilename = '',
		tempPathname = pathname.substr(0, extpos) + '.' + ext,
		tempFilename = path.normalize(dirname + tempPathname);
		fs.stat(tempFilename, function(err, stats){
			if (err) {next();}
			else if (stats.isFile()){
				req.originalUrl = req.url;
				req.url = req.url.replace(pathname, tempPathname);	
				res.setHeader('Vary', 'Accept');
				next();
			}
		});
}

module.exports = function(root){
	dirname = root;
	return function(req, res, next){
		var parsed = url.parse(req.url),
			pathname = parsed.pathname,
			extpos = pathname.lastIndexOf('.'),
			ext = pathname.substr(extpos + 1);
		if (ext === 'jpeg' || ext === 'jpg' || ext === 'png'){
			if (req.headers.accept && req.headers.accept.indexOf('image/webp') !== -1){
				updateReqUrl('webp', req, res, next, pathname, extpos);
			} else {
				var uaString = req.headers['user-agent'],
					is = ua.is(uaString),
					agent = ua.parse(uaString);
				if ((is.chrome && agent.satisfies('>=23.0.0'))
					||  (is.opera && agent.satisfies('>=12.1'))
					||  (is.android && agent.satisfies('>=4.0'))){
					
					updateReqUrl('webp', req, res, next, pathname, extpos);

				} else if (is.ie && agent.satisfies('>=9.0')){
					updateReqUrl('jxr', req, res, next, pathname, extpos);
				} else {
					next();
				}
			}
		} else {
			next();
		}
	};
};