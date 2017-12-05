var pfMod = window.pfMod || (function(window, undef) {
  var doc = window.document,
      protocol = doc.location.protocol;

  var defaultConfig = {
    environment: 'production',
    protocol: protocol,
    dir: 'ltr',
    usingBM: false,
    hosts: {
      cdn: protocol == 'https:' ? 'https://d1xyn5x24gwwys.cloudfront.net': 'http://cdn.printnicer.com',
      pf: protocol + '//www.printfriendly.com',
      pdf: protocol + '//pdf.printfriendly.com',
      email: protocol + '//email-srv.printfriendly.com',
      tracker: protocol + '//log.printfriendly.com',
      page: window.location.host
    },
    domains: {
      page: window.location.host.split(':')[0].split('www.').pop()
    }
  };

  var dom = {
    isReady: false,
    readyBound: false,

    addStyles: function() {
      var css = 'body * { z-index: 0 !important; }',
          head = document.getElementsByTagName('head')[0],
          style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css));}
      head.appendChild(style);
    },

    setWidthOfImages: function() {
      var elements = document.getElementsByTagName('img');
      for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.width = el.width;
      }
    },

    convertRelativetoAbsolute: function(tag) {
      var elements = document.getElementsByTagName(tag);
      for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        // IE breaks on mistyped mailto links like <a href="http://mj@mj.com">
        try {
          if(tag === 'img')
            el.src = el.src;
          else
            el.href = el.href;
        } catch(e) {}
      }
    },

    removeScripts: function () {
      var scripts = document.getElementsByTagName('script');
      for(var i = scripts.length-1; i >= 0; i-=1) {
        if(typeof(scripts[i].src) === "undefined" || (scripts[i].src.indexOf('printfriendly') === -1)) {
          scripts[i].nodeValue="";
          scripts[i].removeAttribute('src');
          if (scripts[i].parentNode) {
            scripts[i].parentNode.removeChild(scripts[i]);
          }
        }
      }
    },

    markHiddenElements: function() {
      var accessMethod, displayStyle;
      if(window.getComputedStyle) {
        accessMethod = 'standard';
      } else if(document.body.currentStyle) {
        accessMethod = 'ie';
      }
      var allElements = document.body.getElementsByTagName('*');
      for(var i=0; i < allElements.length; i++) {
        var element = allElements[i];
        if(accessMethod === 'ie') {
          displayStyle = element.currentStyle['display'];
        } else if(accessMethod === 'standard') {
          displayStyle = window.getComputedStyle(element,null).getPropertyValue('display')
        }
        if(displayStyle === 'none') {
          element.className += ' hidden-originally';
        }
      }
    },

    ready: function() {
      if ( !dom.isReady) {
        if ( !document.body) {
          return setTimeout( dom.ready, 13);
        }
        dom.isReady = true;
        dom.readyFunc.call();
      }
    },

    doScrollCheck: function() {
      if ( dom.isReady ) {
        return;
      }

      try {
        document.documentElement.doScroll("left");
      } catch(e) {
        return setTimeout(dom.doScrollCheck, 50);
      }
      dom.detach();
      dom.ready();
    },

    detach: function() {
      if ( document.addEventListener ) {
          document.removeEventListener( "DOMContentLoaded", dom.completed, false );
          window.removeEventListener( "load", dom.completed, false );
      } else if ( document.attachEvent ) {
        if ( document.readyState === "complete" ) {
          document.detachEvent( "onreadystatechange", dom.completed );
          window.detachEvent( "onload", dom.completed );
        }
      }
    },

    completed: function(event) {
      if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
        dom.detach();
        dom.ready();
      }
    },

    bindReady: function() {
      if(dom.readyBound)
        return;

      dom.readyBound = true;

      if ( document.readyState === "complete" ) {
        return dom.ready();
      }

      if ( document.addEventListener ) {
        document.addEventListener("DOMContentLoaded", dom.completed, false );
        window.addEventListener( "load", dom.completed, false );
      } else if ( document.attachEvent ) {
        document.attachEvent("onreadystatechange", dom.completed);
        window.attachEvent( "onload", dom.completed );
        var toplevel = false;

        try {
          toplevel = window.frameElement == null ;
        } catch(e) {}

        if ( toplevel && document.documentElement.doScroll ) {
          dom.doScrollCheck();
        }
      }
    },

    domReady: function(fn) {
      this.readyFunc = fn;
      this.bindReady();
    }
  };

  var userSettings = {
    headerImageUrl: window.pfHeaderImgUrl,
    headerTagline: window.pfHeaderTagline,
    imageDisplayStyle: window.pfImageDisplayStyle,
    customCSSURL: window.pfCustomCSS,
    disableClickToDel: window.pfdisableClickToDel,
    disablePDF: window.pfDisablePDF,
    disablePrint: window.pfDisablePrint,
    disableEmail: window.pfDisableEmail,
    hideImages: window.pfHideImages
  };

  var pf = {
    version: '6',
    initialized: false,

    init: function(options) {
      this.initialized = true;
      this.configure(options);
      this.setVariables();
      this.detectBrowser();
      this.startIfNecessary();
      window.print = this.start;
    },

    configure: function(options) {
      this.config = defaultConfig;
      if (options) {
        this.config.environment = 'development';
        for(var val in options.hosts) {
          this.config.hosts[val] = options.hosts[val];
        }
      }
    },

    startIfNecessary: function() {
      if (window.pfstyle || this.config.urls.page.indexOf('pfstyle=wp') != -1) { this.start(); }
    },

    start: function() {
      if(pf.isRedirectNecessary()) {
        pf.redirect();
      } else {
        dom.domReady(function() {
          pf.startTime = new Date().getTime();
          pf.cacheBodyHTML();
          pf.createMask();
          pf.loadCore();
        });
      }
    },

    setVariables: function() {
      var random = Math.random(),
          _t = this,
          url;
      this.config.urls = {
        js: {
          jquery: protocol + '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js?x=' + random,
          core: _t.config.hosts.cdn + '/javascripts/v' + _t.version + '/core.js?x=' + random,
          algo: _t.config.hosts.cdn + '/javascripts/v' + _t.version + '/algo.js?x=' + random
        },
        css: {
          page: _t.config.hosts.cdn + '/stylesheets/v' + _t.version + '/main.css?x=' + random
        },
        pdfMake: _t.config.hosts.pdf + '/pdfs/make',
        email: _t.config.hosts.email + '/email/new'
      };
      try {url = top.location.href;} catch(e) {url = window.location.href;}
      this.config.urls.page = url;
      this.userSettings = userSettings;
      if(window.pfstyle && (window.pfstyle === "bk" || window.pfstyle === "nbk" || window.pfstyle === "cbk")) {
        this.config.usingBM = true;
      }
    },

    detectBrowser: function() {
      this.browser = {};
      var versionString = navigator.appVersion;
      if(versionString.indexOf('MSIE') !== -1) {
        this.browser.version = parseFloat(versionString.split('MSIE')[1]);
        this.browser.isIE = true;
      } else {
        this.browser.isIE = false;
      }
    },

    createIframe: function(doc) {
      var iframe = doc.createElement('iframe');
      iframe.src = "javascript:false";
      iframe.frameBorder = '0';
      iframe.allowTransparency = 'true';
      return iframe;
    },

    loadHtmlInIframe: function(doc, iframe, html) {
      var dom, idoc;

      try {
        idoc = iframe.contentWindow.document;
      } catch(e) {
        dom = doc.domain;
        iframe.src = "javascript:var d=document.open();d.domain='"+dom+"';void(0);";
        idoc = iframe.contentWindow.document;
      }
      idoc.write(html);
      idoc.close();
    },

    redirect: function() {
      var components = ['redirect=1', 'url=' + encodeURIComponent(top.location.href)];
      for(var config in userSettings) {
        if(typeof userSettings[config] !== 'undefined')
          components.push(config + '=' + encodeURIComponent(userSettings[config]));
      }
      top.location.replace(this.config.hosts.pf + '/print/?' + components.join('&'));
    },

    isRedirectNecessary: function() {
      try {
        if( (navigator.userAgent.match(/(iphone|ipad|ipod)/i)) || (this.browser.isIE && this.browser.version < 8) || (typeof $ !== 'undefined' && $.jcarousel && this.browser.isIE) || (this.browser.isIE && this.browser.version < 9 &&  this.config.domains.page === 'skinnytaste.com') ) {
          return true;
        } else {return false;}
      } catch(e) {return false;}
    },

    createMask: function() {
      var div = document.createElement('div');
      div.innerHTML = '<div id="pf-mask" style="z-index: 2147483627!important; position: fixed !important; top: 0pt !important; left: 0pt !important; background-color: rgb(0, 0, 0) !important; opacity: 0.8 !important;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80); height: 100% !important; width: 100% !important;"></div>';
      document.body.appendChild(div.firstChild);
    },

    cacheBodyHTML: function() {
      dom.addStyles();
      dom.setWidthOfImages();
      dom.convertRelativetoAbsolute('a');
      dom.convertRelativetoAbsolute('img');
      dom.removeScripts();
      dom.markHiddenElements();
      pf.bodyCache = '<div id="'+ document.body.id +'" class="' + document.body.className + ' pf-body-cache">' + document.body.innerHTML + '</div>';
      if(pf.browser.isIE)
        document.body.innerHTML = '<p></p>';
    },

    refresh: function() {
      var pageUrl = pf.config.urls.page.replace("pfstyle=wp",'').replace(/#(.*)$/,'');
      try{
        document.body.innerHTML = '<div style="position:absolute; top:0; bottom:0; left:0; right:0; padding:10%; text-align:center; background:#333;">&nbsp;</div>';
        window.top.location.href = pageUrl;
        return false;
      } catch(err) {
        setTimeout(function(){window.top.location.replace(pageUrl);},100);
      }
    },
    removeDoubleSemiColon: function(str) {
      return str.replace(/;{2}/g, ';');
    },

    loadCore: function() {
      var html = ['<!DOCTYPE html><html><head><meta http-equiv="X-UA-Compatible" content="IE=edge" />',
                  '<script>(function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a); c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0]; c.src="//beacon.errorception.com/"+s+".js";c.async=!0;b.parentNode.insertBefore(c,b)}; _.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)}) (window,document,"script","51dd5a5a0a7b9b3d5a0004f8");', '</', 'script>',
                  '<script src="' + this.config.urls.js.jquery + '"></', 'script>',
                  '<script src="' + this.config.urls.js.core +   '"></', 'script>',
                  '<link media="screen" type="text/css" rel="stylesheet" href="',
                  this.config.urls.css.page + '">',
                  '</head><body onload="core.init();"></body>'].join('');
      var coreIframe = this.createIframe(document);
      coreIframe.id = 'pf-core';
      document.body.appendChild(coreIframe);
      var style = coreIframe.style.cssText + ';' + 'width: 100% !important;height: 100% !important; display: block !important; overflow: hidden !important; position: absolute !important; top: 0px !important; left: 0px !important; background-color: transparent !important; z-index: 2147483637!important';
      coreIframe.style.cssText = this.removeDoubleSemiColon(style);
      this.loadHtmlInIframe(document, coreIframe, html);
    }
  };
  return pf;
})(window);
var priFri = pfMod;
if(window.name !== 'algo' && !pfMod.initialized) pfMod.init(window.pfOptions);
