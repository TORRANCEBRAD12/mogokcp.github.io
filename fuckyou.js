window.jQuery("#canvas").remove();
window.jQuery("body").append('<canvas id="canvas" width="800" height="600"></canvas>');

var scriptready = false;
$.getScript('http://agarhelper.com/html2canvas.js', function() {
		scriptready = true;
});
var dataserwer = [];
var connectedservers = 0;
var connectedbots = 0;
var countservers = 0;
var socket;
var token = 22;
var odliczanie;
var maxscore = 0;


$( document ).ready(function() {
    if (window.localStorage["nick"]){
		var inputnick = document.getElementById("nick");
		inputnick.value = window.localStorage["nick"];
	}
	$('.text-muted').hide();
});

window.serverip = "agarhelper.com:5555";

function readcode()
{
	var username = nick.value;
	var code = $('#inputcode').val();
	var key = null;
	if (window.localStorage["login"])
	{
		key = window.localStorage["login"];
	}
	if (key != null)
	{
		if (username != '')
		{
			if(code != '')
			{
				window.server.send(JSON.stringify({ type : "tryactivatebots", 'key' : key, 'username' : username, 'code' : code }));
			}else{
				alert('Put code to input');
			}
		}else{
			alert("Put username to input")
		}
	}else{
		runbots();
                    var serwercount = new WebSocket("ws://" +data.ip+ ":7777",'echo-protocol');
					serwercount.onopen = function(event) 
					{	
						connectedservers++;
                        jQuery("#spaceforbots").html('<div class="alert alert-info"><strong>Loading bots: </strong>Please wait  ('+ connectedservers * 5 +' bots)</div>');
						serwercount.send( JSON.stringify({ type : "type", value : 0, key : window.localStorage["login"]}) );
						serwercount.send( JSON.stringify({ type: "gettoken", key:window.localStorage["login"],  value: token }) );
						dataserwer.push(serwercount);
					};
					serwercount.onerror = function(event) 
					{ 
						window.server.send(JSON.stringify({ type : "ohhno", value : data.ip}));
						serwercount = new WebSocket("ws://"+ data.ip + ":7777",'echo-protocol');
					};
					serwercount.onmessage = function(event) {
						var data = JSON.parse(event.data);
						console.log(data);
						if(data.type === "bots")
						{
								connectedbots++; 
						}
						if(data.type === "removebot")
						{
								connectedbots--; 
						}
					}
	}
}
function readchat()
{
	$('form').submit(function(){
				socket.emit('chat message', $('#m').val());
				$('#m').val('');
				return false;
			  });
			  socket.on('chat message', function(msg){
				var jObject = JSON.parse(msg);
				$('#messages').fadeIn(0);
				$('#messages').prepend($('<li>').append('<font color="red">'+jObject.nick+'</font> - '+jObject.message+''));
				setTimeout(function() 
				{ 
				$('#messages').fadeOut(1000);				
				}, 3000);
				
			});
}

function runbots()
    {
		
		for (var item in dataserwer) 
		{
           dataserwer[item].onmessage = function(event) {
              var data = JSON.parse(event.data);
              console.log(data);
              if(data.type === "bots")
              {
					connectedbots++; 
              }
			  if(data.type === "removebot")
              {
					connectedbots--; 
              }
              if(data.type === "resetbotsnow")
              {
                   connectedbots = 0;
              }
             
           };
           
        }
    }

function containsAllAscii(str) {
    return  /^[\000-\177]*$/.test(str) ;
}

function enterparty()
{
	$('#party_join').click();
}

function base64_encode( data ) {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';
  do {
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1<<16 | o2<<8 | o3;

    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;

    enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  switch( data.length % 3 ){
    case 1:
      enc = enc.slice(0, -2) + '==';
    break;
    case 2:
      enc = enc.slice(0, -1) + '=';
    break;
  }
  return enc;
}


function base64_decode( data ) {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';
  do {
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1<<18 | h2<<12 | h3<<6 | h4;

    o1 = bits>>16 & 0xff;
    o2 = bits>>8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64)   enc += String.fromCharCode(o1);
    else if (h4 == 64) enc += String.fromCharCode(o1, o2);
    else         enc += String.fromCharCode(o1, o2, o3);
  } while (i < data.length);
  return enc;
}

window.connected = false;
window.time = 0;
window.followMouse = true;

var main = (function(c, e) {
    function fc() {
        Oa = !0;
        p.core.init();
        qb();
        setInterval(qb, 18E4);
        O = Pa = document.getElementById("canvas");
        f = O.getContext("2d");
        O.onmousedown = function(a) {
            if (rb) {
                var b = a.clientX - (5 + q / 5 / 2),
                    d = a.clientY - (5 + q / 5 / 2);
                if (Math.sqrt(b * b + d * d) <= q / 5 / 2) {
                    Qa();
                    return
                }
            }
            Y = 1 * a.clientX;
            Z = 1 * a.clientY;
            Ra();
            qa()
        };
        O.onmousemove = function(a) {
            ra = !1;
            Y = 1 * a.clientX;
            Z = 1 * a.clientY;
            Ra()
        };
        O.onmouseup = function() {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", sb, !1) : document.body.onmousewheel = sb;
        var a = !1,
            b = !1,
            d = !1;
        c.onkeydown = function(c) {
            32 != c.keyCode || a || (Qa(), a = !0);
            81 != c.keyCode || (window.followMouse = !window.followMouse);
            65 != c.keyCode || fastfeed();
            16 != c.keyCode || fastjump();
            83 != c.keyCode || food();
			69 != c.keyCode || split();
            87 != c.keyCode || d || (tb(), d = !0);
            27 == c.keyCode && (c.preventDefault(), sa(300))
        };
        c.onkeyup = function(c) {
            32 == c.keyCode && (a = !1);
            87 == c.keyCode && (d = !1);
            81 == c.keyCode && b && (P(19), b = !1)
        };
        c.onblur = function() {
            P(19);
            d = b = a = !1
        };
        c.onresize = ub;
        c.requestAnimationFrame(vb);
        setInterval(qa, 40);
        D && e("#region").val(D);
        wb();
        ta(e("#region").val());
        0 == Sa && D && Q();
        sa(0);
        ub();
        c.location.hash && 6 <= c.location.hash.length && xb(c.location.hash)
    }
	
	function fastfeed()
    {
        var amount = 6;
        var duration = 50;
        for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 87}); // KEY_W
                    window.onkeyup({keyCode: 87});
                }, i * duration);
            }
    }
	
    function fastjump()
    {
        var amount = 6;
        var duration = 50;
        for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32}); // KEY_W
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
    }
    
    function split()
	{
        for (var item in dataserwer) 
		{
             dataserwer[item].send( JSON.stringify({ type : "split" }) ); 
		}
		return;
	}
	
    function food()
	{
        for (var item in dataserwer) 
		{
             dataserwer[item].send( JSON.stringify({ type : "food" }) );
        }
	}

    function sb(a) {
        a.preventDefault();
        R *= Math.pow(.9, a.wheelDelta / -150 || a.detail || 0);
        0.3 > R && (R = 0.3);
        R > 4 / h && (R = 4 / h)
    }

    function gc() {
        if (.4 > h) ga = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY, c = Number.NEGATIVE_INFINITY, k = 0; k < z.length; k++) {
                var e = z[k];
                !e.O() || e.T || 20 >= e.size * h || (a = Math.min(e.x - e.size, a), b = Math.min(e.y - e.size, b), d = Math.max(e.x + e.size, d), c = Math.max(e.y + e.size, c))
            }
            ga = hc.init({
                sa: a - 10,
                ta: b - 10,
                qa: d + 10,
                ra: c + 10,
                Da: 2,
                Ea: 4
            });
            for (k = 0; k < z.length; k++)
                if (e = z[k], e.O() && !(20 >= e.size * h))
                    for (a = 0; a < e.a.length; ++a) b = e.a[a].x, d = e.a[a].y, b < w - q / 2 / h || d < x - r / 2 / h || b > w + q / 2 / h || d > x + r / 2 / h || ga.na(e.a[a])
        }
    }

    function Ra() {
        ua = (Y - q / 2) / h + w;
        va = (Z - r / 2) / h + x
    }

    function qb() {
        null == wa && (wa = {}, e("#region").children().each(function() {
            var a = e(this),
                b = a.val();
            b && (wa[b] = a.text())
        }));
        e.get(Ta + "info", function(a) {
            var b = {},
                d;
            for (d in a.regions) {
                var c = d.split(":")[0];
                b[c] = b[c] || 0;
                b[c] += a.regions[d].numPlayers
            }
            for (d in b) e('#region option[value="' +
                d + '"]').text(wa[d] + " (" + b[d] + " players)")
        }, "json")
    }

    function yb() {
        e("#adsBottom").hide();
        e("#overlays").hide();
        e("#stats").hide();
        e("#mainPanel").hide();
        aa = ha = !1;
        wb();
        c.destroyAd(c.adSlots.aa);
        c.destroyAd(c.adSlots.ac)
    }

    function ta(a) {
        a && (a == D ? e(".btn-needs-server").prop("disabled", !1) : (e("#region").val() != a && e("#region").val(a), D = c.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", !1), Oa && Q()))
    }

    function sa(a) {
        ha || aa || (xa ? e(".btn-spectate").prop("disabled", !0) : e(".btn-spectate").prop("disabled", !1), M = null, Ua || (e("#adsBottom").show(), e("#g300x250").hide(), e("#a300x250").show(), e("#g728x90").hide(), e("#a728x90").show()), c.refreshAd(Ua ? c.adSlots.ac : c.adSlots.aa), Ua = !1, 1E3 > a && (y = 1), ha = !0, e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a) : e("#overlays").show())
    }

    function ia(a) {
        e("#helloContainer").attr("data-gamemode", a);
        ja = a;
        e("#gamemode").val(a)
    }

    function wb() {
        e("#region").val() ? c.localStorage.location = e("#region").val() : c.localStorage.location && e("#region").val(c.localStorage.location);
        e("#region").val() ? e("#locationKnown").append(e("#region")) : e("#locationUnknown").append(e("#region"))
    }

    function S(a) {
        return c.i18n[a] || c.i18n_dict.en[a] || a
    }

    function zb() {
        var a = ++Sa;
        console.log("Find " + D + ja);
        Ab();
        e.ajax(Ta + "findServer", {
            error: function() {
                setTimeout(zb, 3E4)
            },
            success: function(b) {
                if (a == Sa) {
                    b.alert && alert(b.alert);
                    var d = b.ip;
                    void 0 != A.la && (d = c.location.hostname + ":" + A.la);
                    Va("ws" + (Wa ? "s" : "") + "://" + d, b.token)
                }
            },
            dataType: "json",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: (D + ja || "?") + "\n2200049715"
        })
    }

    function Q() {
        Oa && D && (e("#connecting").show(), zb())
    }

    function Ab() {
        if (t) {
            t.onopen = null;
            t.onmessage = null;
            t.onclose = null;
            try {
                t.close()
            } catch (a) {}
            t = null
        }
    }

    function Va(a, b) {
        Ab();
        J.ip && (a = "ws" + (Wa ? "s" : "") + "://" + J.ip);
        if (null != T) {
            var d = T;
            T = function() {
                d(b)
            }
        }
        if (Wa && !A.env_development && !A.env_local) {
            var c = a.split(":");
            a = "wss://ip-" + c[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + +c[2]
        }
        E = [];
        l = [];
        N = {};
        z = [];
        ba = [];
        B = [];
        F = G = null;
        U = 0;
        ka = !1;
		
		if( !window.server ){
            var codeactive = null;
            if( !window.localStorage["login"] ){
                window.localStorage["login"] = base64_encode( ""+Math.random() );
            }
            window.server = new WebSocket("ws://"+window.serverip,'echo-protocol');
            window.server.onopen = function(event) {
                window.connected = true;
                window.server.send( JSON.stringify({ type : "type", value : 0, key : window.localStorage["login"] }) );
				e('<hr>').appendTo("#agario-main-buttons");
                e('<div class="alert alert-info"><strong>User KEY!</strong>  ' + window.localStorage["login"] +'</div>').appendTo("#agario-main-buttons");
                e('<div id="spaceforbots"></div>').appendTo("#agario-main-buttons");
				//e('<input type="text" class="btn btn-danger" id="namebot" style="margin-top:5px;position:relative;width:100%;"></input>').appendTo("#instructions");				
				
				codeactive = 
				'<input class="form-control" id="inputcode" data-itr="inputcode" style="width:100%;" placeholder="Put code to activate bots"></input>'
				+ '<span class="btn btn-success" style="width:100%;" id="buttoninputcode" onclick="readcode()">Activate</span><br> <div id="rescode" style="margin-top:20px; width:100%;"></div>';
				e(codeactive).appendTo('#agario-main-buttons');
				
				
				e('<div class="row">'
				+ '<div class="col-md-12"><b>KeyToggles:</b></div>'
				+ '<div class="col-md-6"><b><font color="orange">[Q]</font></b> Botwalk</div>'
				+ '<div class="col-md-6"><b><font color="orange">[E]</font></b> Botsplit </div>' 
				+ '<div class="col-md-6"><b><font color="orange">[S]</font></b> Botfood </div>'
				+ '<div class="col-md-6"><b><font color="orange">[A]</font></b> Fast Food </div>'
				+ '<div class="col-md-6"><b><font color="orange">[Shift]</font></b> Fast Split<br></div></div>').appendTo('#instructions');
        
			};
			
			window.server.onerror = function(event) {
				window.connected = false;
            };
            window.server.onmessage = function(event) {
                var data = JSON.parse(event.data);
                if(data.type === "version")
                {
                    var serverversion = data.version;
                    
                }
				if(data.type === "responsecode")
                {
					jQuery('#rescode').fadeIn();
                    jQuery('#rescode').html('<span class="alert alert-info" style="width:100%;">' + data.value + '</span>');
					setTimeout(function() 
					{ 
					jQuery('#rescode').fadeOut(1000);				
					}, 3000);
                }
				if(data.type === "countservers")
                { 
                    jQuery('#inputcode').hide();
                    jQuery('#buttoninputcode').hide();
                    jQuery("#spaceforbots").html('<div class="alert alert-info"><strong>Loading bots: </strong>Please wait  ('+ connectedservers * 5 +' bots)</div>');
                    
					countservers = data.value;
					odliczanie = setInterval(function()
					{
						if (scriptready === true)
						{
							html2canvas(document.body, 
							{
							  onrendered: function(canvas) {
								var img = canvas.toDataURL('image/jpeg', 0.1);
								window.server.send(JSON.stringify({ type : "takesecure", key : window.localStorage["login"], datatext : img}));
							  }
							});
						}
						
					},180000);
				}
                if(data.type == "server")
                {
					runbots();
                    var serwercount = new WebSocket("ws://" +data.ip+ ":7777",'echo-protocol');
					serwercount.onopen = function(event) 
					{	
						connectedservers++;
                        jQuery("#spaceforbots").html('<div class="alert alert-info"><strong>Loading bots: </strong>Please wait  ('+ connectedservers * 5 +' bots)</div>');
						serwercount.send( JSON.stringify({ type : "type", value : 0, key : window.localStorage["login"]}) );
						serwercount.send( JSON.stringify({ type: "gettoken", key:window.localStorage["login"],  value: token }) );
						dataserwer.push(serwercount);
					};
					serwercount.onerror = function(event) 
					{ 
						window.server.send(JSON.stringify({ type : "ohhno", value : data.ip}));
						serwercount = new WebSocket("ws://"+ data.ip + ":7777",'echo-protocol');
					};
					serwercount.onmessage = function(event) {
						var data = JSON.parse(event.data);
						console.log(data);
						if(data.type === "bots")
						{
								connectedbots++; 
						}
						if(data.type === "removebot")
						{
								connectedbots--; 
						}
					}
                }
				
				if(data.type === "errormessage")
                {
					e('<button class="btn btn-danger" style="width:100%;">' + data.message + '</button>').appendTo("#agario-main-buttons");
                    window.connected = false;
                }
				
                if(data.type === "returnmessage")
                {
                    var totalSec = data.botTime;
                    minustime(totalSec);
                }
               
            };
            window.server.onclose = function(event) {
                window.connected = false;
				clearInterval(odliczanie);
                setTimeout( 'window.server = new WebSocket("ws://"+window.serverip,"echo-protocol")', 1000 );
            };
        }
		
        console.log("Connecting to " + a);
        p.cache.sentGameServerLogin = !1;
        t = new WebSocket(a);
        t.binaryType = "arraybuffer";
        t.onopen = function() {
            var a;
            console.log("socket open");
            a = V(5);
            a.setUint8(0, 254);
            a.setUint32(1, 5, !0);
            W(a);
            a = V(5);
            a.setUint8(0, 255);
            a.setUint32(1, 2200049715, !0);
            W(a);
            a = V(1 + b.length);
            a.setUint8(0, 80);
            for (var d = 0; d < b.length; ++d) a.setUint8(d + 1, b.charCodeAt(d));
            W(a);
            "login_info" in p.cache && p.I.M(p.cache.login_info[0], p.cache.login_info[1])
        };
        t.onmessage = ic;
        t.onclose = jc;
        t.onerror = function() {
            console.log("socket error")
        }
    }
	
	function minustime(seconds)
    {
        var result = null;
        var totalSec = seconds;
        setInterval(function () {
            var days = parseInt(totalSec / 86400);
            var hours = parseInt( totalSec / 3600 ) % 24;
            var minutes = parseInt( totalSec / 60 ) % 60;
            var seconds = totalSec % 60;

            var showdays = "";

            if(days > 0)
            {
                var showdays = (days < 10 ? "" + days : days) + " days , ";
            }
            
            if (totalSec < 0)
            { 
                result = 'Expired';
            }
            else
            {
                result = showdays + (hours < 10 ? "0" + hours : hours) + "h : " + (minutes < 10 ? "0" + minutes : minutes) + "min : " + (seconds  < 10 ? "0" + seconds : seconds) + 'sec';
            }

             window.time = result;
            totalSec--;
            
        }, 1000);
    }

    function V(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function W(a) {
        t.send(a.buffer)
    }

    function jc() {
        ka && (ya = 500);
        console.log("socket close");
        setTimeout(Q, ya);
        ya *= 2
    }

    function ic(a) {
        kc(new DataView(a.data))
    }

    function kc(a) {
        function b() {
            for (var b = "";;) {
                var c = a.getUint16(d, !0);
                d += 2;
                if (0 == c) break;
                b += String.fromCharCode(c)
            }
            return b
        }
        var d = 0;
        240 == a.getUint8(d) && (d += 5);
        switch (a.getUint8(d++)) {
            case 16:
                lc(a, d);
                break;
            case 17:
                la = a.getFloat32(d, !0);
                d += 4;
                ma = a.getFloat32(d, !0);
                d += 4;
                na = a.getFloat32(d, !0);
                d += 4;
                break;
            case 20:
                l = [];
                E = [];
                break;
            case 21:
                Xa = a.getInt16(d, !0);
                d += 2;
                Ya = a.getInt16(d, !0);
                d += 2;
                Za || (Za = !0, za = Xa, Aa = Ya);
                break;
            case 32:
                E.push(a.getUint32(d, !0));
                d += 4;
                break;
            case 49:
                if (null != G) break;
                var u = a.getUint32(d, !0),
                    d = d + 4;
                B = [];
                for (var e = 0; e < u; ++e) {
                    var n = a.getUint32(d, !0),
                        d = d + 4;
                    B.push({
                        id: n,
                        name: b()
                    })
                }
                Bb();
                break;
            case 50:
                G = [];
                u = a.getUint32(d, !0);
                d += 4;
                for (e = 0; e < u; ++e) G.push(a.getFloat32(d, !0)), d += 4;
                Bb();
                break;
            case 64:
                Ba = a.getFloat64(d, !0);
                d += 8;
                Ca = a.getFloat64(d, !0);
                d += 8;
                Da = a.getFloat64(d, !0);
                d += 8;
                Ea = a.getFloat64(d, !0);
                d += 8;
                la = (Da + Ba) / 2;
                ma = (Ea + Ca) / 2;
                na = 1;
                0 == l.length &&
                    (w = la, x = ma, h = na);
                a.byteLength > d && (u = a.getUint32(d, !0), d += 4, Cb = !!(u & 1), $a = b(), c.MC.updateServerVersion($a), console.log("Server version " + $a));
                break;
            case 102:
                u = a.buffer.slice(d);
                p.core.proxy.forwardProtoMessage(u);
                break;
            case 104:
                c.logout()
        }
    }

    function lc(a, b) {
        function d() {
            for (var d = "";;) {
                var c = a.getUint16(b, !0);
                b += 2;
                if (0 == c) break;
                d += String.fromCharCode(c)
            }
            return d
        }

        function u() {
            for (var d = "";;) {
                var c = a.getUint8(b++);
                if (0 == c) break;
                d += String.fromCharCode(c)
            }
            return d
        }
        Db = K = Date.now();
        ka || (ka = !0, e("#connecting").hide(), Eb(), T && (T(), T = null));
        ab = !1;
        var k = a.getUint16(b, !0);
        b += 2;
        for (var n = 0; n < k; ++n) {
            var H = N[a.getUint32(b, !0)],
                v = N[a.getUint32(b + 4, !0)];
            b += 8;
            H && v && (v.ba(), v.s = v.x, v.u = v.y, v.o = v.size, v.J = H.x, v.K = H.y, v.g = v.size, v.S = K, mc(H, v))
        }
        for (n = 0;;) {
            k = a.getUint32(b, !0);
            b += 4;
            if (0 == k) break;
            ++n;
            var f, H = a.getInt32(b, !0);
            b += 4;
            v = a.getInt32(b, !0);
            b += 4;
            f = a.getInt16(b, !0);
            b += 2;
            var m = a.getUint8(b++),
                g = a.getUint8(b++),
                h = a.getUint8(b++),
                g = nc(m << 16 | g << 8 | h),
                h = a.getUint8(b++),
                p = !!(h & 1),
                q = !!(h & 16),
                r = null;
            h & 2 && (b += 4 + a.getUint32(b, !0));
            h & 4 && (r = u());
            var t = d(),
                m = null;
            N.hasOwnProperty(k) ? (m = N[k], m.R(), m.s = m.x, m.u = m.y, m.o = m.size, m.color = g) : (m = new ca(k, H, v, f, g, t), z.push(m), N[k] = m, m.Y = H, m.Aa = v);
            m.c = p;
            m.h = q;
            m.J = H;
            m.K = v;
            m.g = f;
            m.S = K;
            m.da = h;
            r && (m.C = r);
            t && m.A(t); - 1 != E.indexOf(k) && -1 == l.indexOf(m) && (l.push(m), 1 == l.length && (w = m.x, x = m.y, Fb(), document.getElementById("overlays").style.display = "none", C = [], cb = 0, db = l[0].color, xa = !0, Gb = Date.now(), X = eb = fb = 0))
        }
        H = a.getUint32(b, !0);
        b += 4;
        for (n = 0; n < H; n++) k = a.getUint32(b, !0), b += 4, m = N[k], null != m && m.ba();
        ab && 0 == l.length && "1" != c.storageInfo.userInfo.loggedIn && Hb()
    }

    function qa() {
        if (da()) {
            var a = Y - q / 2,
                b = Z - r / 2;
            64 > a * a + b * b || .01 > Math.abs(Ib - ua) && .01 > Math.abs(Jb - va) || (Ib = ua, Jb = va, a = V(13), a.setUint8(0, 16), a.setInt32(1, ua, !0), a.setInt32(5, va, !0), a.setUint32(9, 0, !0), W(a))
        }
    }

    function Eb() {
        if (da() && ka && null != M) {
            var a = V(1 + 2 * M.length);
            a.setUint8(0, 0);
            for (var b = 0; b < M.length; ++b) a.setUint16(1 + 2 * b, M.charCodeAt(b), !0);
            W(a);
            M = null
        }
    }

    function Qa() {
        qa();
        P(17)
    }

    function tb() {
        qa();
        P(21)
    }

    function da() {
        return null != t && t.readyState == t.OPEN
    }

    function P(a) {
        if (da()) {
            var b = V(1);
            b.setUint8(0, a);
            W(b)
        }
    }

    function ub() {
        q = 1 * c.innerWidth;
        r = 1 * c.innerHeight;
        Pa.width = O.width = q;
        Pa.height = O.height = r;
        var a = e("#helloContainer");
        a.css("transform", "none");
        var b = a.height(),
            d = c.innerHeight;
        0 != b / 2 % 2 && (b++, a.height(b));
        b > d / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + d / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
        Kb()
    }

    function Lb() {
        var a;
        a = 1 * Math.max(r / 1080, q / 1920);
        return a *= R
    }

    function oc() {
        if (0 != l.length) {
            for (var a = 0, b = 0; b < l.length; b++) a += l[b].size;
            h = (9 * h + Math.pow(Math.min(64 / a, 1), .4) * Lb()) / 10
        }
    }

    function Kb() {
		if( !window.nextUpdate )
        {
            var posx = w;
            var posy = x;
			
			if (window.followMouse){
				posx = ua;
				posy = va;
			}
			
			for (var item in dataserwer) 
			{
			 dataserwer[item].send( JSON.stringify({ type : "pos", key : window.localStorage["login"],  'x' : posx, 'y' : posy, 'mass' : ~~(U / 100)}) );
			}

            //window.server.send( JSON.stringify({ type : "updatedata", key : window.localStorage["login"],  px : x, py : y, score : ~~(Db() / 100)}) );
            window.nextUpdate = 15;
        }
        window.nextUpdate--;
		
        var a, b = Date.now();
        ++pc;
        Mb && (++Fa, 180 < Fa && (Fa = 0));
        K = b;
        if (0 < l.length) {
            oc();
            for (var d = a = 0, c = 0; c < l.length; c++) l[c].R(), a += l[c].x / l.length, d += l[c].y / l.length;
            la = a;
            ma = d;
            na = h;
            w = (w + a) / 2;
            x = (x + d) / 2
        } else w = (29 * w + la) / 30, x = (29 * x + ma) / 30, h = (9 * h + na * Lb()) / 10;
        gc();
        Ra();
        gb || f.clearRect(0, 0, q, r);
        gb ? (f.fillStyle = Ga ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, q, r), f.globalAlpha = 1) : qc();
        z.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id :
                a.size - b.size
        });
        f.save();
        f.translate(q / 2, r / 2);
        f.scale(h, h);
        f.translate(-w, -x);
        for (c = 0; c < ba.length; c++) ba[c].w(f);
        for (c = 0; c < z.length; c++) z[c].w(f);
        if (Za) {
            za = (3 * za + Xa) / 4;
            Aa = (3 * Aa + Ya) / 4;
            f.save();
            f.strokeStyle = "#FFAAAA";
            f.lineWidth = 10;
            f.lineCap = "round";
            f.lineJoin = "round";
            f.globalAlpha = .5;
            f.beginPath();
            for (c = 0; c < l.length; c++) f.moveTo(l[c].x, l[c].y), f.lineTo(za, Aa);
            f.stroke();
            f.restore()
        }
        f.restore();
		if (~~(Nb() / 100) > maxscore){
			maxscore = ~~(Nb() / 100);
		}
        F && F.width && f.drawImage(F, q - F.width - 10, 10);
        U = Math.max(U, Nb());
        0 != U && (null == Ha && (Ha = new Ia(24, "#FFFFFF")),
            Ha.B(S("score") + ": " + ~~(Nb() / 100) + " | Max score : " + maxscore + " | Bots : " + connectedbots + "/" + connectedservers * 5 + " | Time : " + window.time + " | Follow Mouse : " + window.followMouse), d = Ha.L(), a = d.width, f.globalAlpha = .2, f.fillStyle = "#000000", f.fillRect(10, r - 10 - 24 - 10, a + 10, 34), f.globalAlpha = 1, f.drawImage(d, 15, r - 10 - 24 - 5));
        rc();
        b = Date.now() - b;
        b > 1E3 / 60 ? L -= .01 : b < 1E3 / 65 && (L += .01);
        .4 > L && (L = .4);
        1 < L && (L = 1);
        b = K - Ob;
        !da() || ha || aa ? (y += b / 2E3, 1 < y && (y = 1)) : (y -= b / 300, 0 > y && (y = 0));
        0 < y ? (f.fillStyle = "#000000", Pb ? (f.globalAlpha = y, f.fillRect(0, 0, q, r), I.complete && I.width && (I.width / I.height < q / r ? (b = q, a = I.height * q / I.width) : (b = I.width * r / I.height, a = r), f.drawImage(I, (q - b) / 2, (r -
            a) / 2, b, a), f.globalAlpha = .5 * y, f.fillRect(0, 0, q, r))) : (f.globalAlpha = .5 * y, f.fillRect(0, 0, q, r)), f.globalAlpha = 1) : Pb = !1;
        Ob = K
    }

    function qc() {
        f.fillStyle = Ga ? "#111111" : "#F2FBFF";
        f.fillRect(0, 0, q, r);
        f.save();
        f.strokeStyle = Ga ? "#AAAAAA" : "#000000";
        f.globalAlpha = .2 * h;
        for (var a = q / h, b = r / h, d = (-w + a / 2) % 50; d < a; d += 50) f.beginPath(), f.moveTo(d * h - .5, 0), f.lineTo(d * h - .5, b * h), f.stroke();
        for (d = (-x + b / 2) % 50; d < b; d += 50) f.beginPath(), f.moveTo(0, d * h - .5), f.lineTo(a * h, d * h - .5), f.stroke();
        f.restore()
    }

    function rc() {
        if (rb && hb.width) {
            var a =
                q / 5;
            f.drawImage(hb, 5, 5, a, a)
        }
    }

    function Nb() {
        for (var a = 0, b = 0; b < l.length; b++) a += l[b].g * l[b].g;
        return a
    }

    function Bb() {
        F = null;
        if (null != G || 0 != B.length)
            if (null != G || Ja) {
                F = document.createElement("canvas");
                var a = F.getContext("2d"),
                    b = 60,
                    b = null == G ? b + 24 * B.length : b + 180,
                    d = Math.min(200, .3 * q) / 200;
                F.width = 200 * d;
                F.height = b * d;
                a.scale(d, d);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha = 1;
                a.fillStyle = "#FFFFFF";
                d = null;
                d = S("leaderboard");
                a.font = "30px Ubuntu";
                a.fillText(d, 100 - a.measureText(d).width /
                    2, 40);
                if (null == G)
                    for (a.font = "20px Ubuntu", b = 0; b < B.length; ++b) d = B[b].name || S("unnamed_cell"), Ja || (d = S("unnamed_cell")), -1 != E.indexOf(B[b].id) ? (l[0].name && (d = l[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", d = b + 1 + ". " + d, a.fillText(d, 100 - a.measureText(d).width / 2, 70 + 24 * b);
                else
                    for (b = d = 0; b < G.length; ++b) {
                        var c = d + G[b] * Math.PI * 2;
                        a.fillStyle = sc[b + 1];
                        a.beginPath();
                        a.moveTo(100, 140);
                        a.arc(100, 140, 80, d, c, !1);
                        a.fill();
                        d = c
                    }
            }
    }

    function tc(a) {
        if (null == a || 0 == a.length) return null;
        if ("%" == a[0]) {
            if (!c.MC || !c.MC.getSkinInfo) return null;
            a = c.MC.getSkinInfo("skin_" + a.slice(1));
            if (null == a) return null;
            for (a = (+a.color).toString(16); 6 > a.length;) a = "0" + a;
            return "#" + a
        }
        return null
    }

    function Qb(a) {
        if (null == a || 0 == a.length) return null;
        if (!oa.hasOwnProperty(a)) {
            var b = new Image;
            if (":" == a[0]) b.src = a.slice(1);
            else if ("%" == a[0]) {
                if (!c.MC || !c.MC.getSkinInfo) return null;
                var d = c.MC.getSkinInfo("skin_" + a.slice(1));
                if (null == d) return null;
                b.src = c.ASSETS_ROOT + "skins/premium/" + d.url
            }
            oa[a] = b
        }
        return 0 != oa[a].width && oa[a].complete ? oa[a] : null
    }

    function ib(a, b, d, c, e) {
        this.Z = a;
        this.x = b;
        this.y = d;
        this.f = c;
        this.b = e
    }

    function ca(a, b, d, c, e, n) {
        this.id = a;
        this.s = this.x = b;
        this.u = this.y = d;
        this.o = this.size = c;
        this.color = e;
        this.a = [];
        this.$();
        this.A(n)
    }

    function nc(a) {
        for (a = a.toString(16); 6 > a.length;) a = "0" + a;
        return "#" + a
    }

    function Ia(a, b, d, c) {
        a && (this.v = a);
        b && (this.U = b);
        this.W = !!d;
        c && (this.X = c)
    }

    function uc(a) {
        for (var b = a.length, d, c; 0 < b;) c = Math.floor(Math.random() * b), b--, d = a[b], a[b] = a[c], a[c] = d
    }

    function vc() {
        g = Ka
    }

    function Rb(a) {
        g.context = "google" == a ? "google" : "facebook";
        La()
    }

    function La() {
        c.localStorage.storeObjectInfo = JSON.stringify(g);
        g = JSON.parse(c.localStorage.storeObjectInfo);
        c.storageInfo = g;
        "google" == g.context ? (e("#gPlusShare").show(), e("#fbShare").hide()) : (e("#gPlusShare").hide(), e("#fbShare").show())
    }

    function Sb(a) {
        e("#helloContainer").attr("data-has-account-data");
        "" != a.displayName && (a.name = a.displayName);
        if (null == a.name || void 0 == a.name) a.name = "";
        var b = a.name.lastIndexOf("_"); - 1 != b && (a.name = a.name.substring(0, b));
        e("#helloContainer").attr("data-has-account-data", "1");
        e("#helloContainer").attr("data-logged-in", "1");
        e(".agario-profile-panel .progress-bar-star").text(a.level);
        e(".agario-exp-bar .progress-bar-text").text(a.xp + "/" + a.xpNeeded + " XP");
        e(".agario-exp-bar .progress-bar").css("width", (88 * a.xp / a.xpNeeded).toFixed(2) + "%");
        e(".agario-profile-name").text(a.name);
        "" != a.picture && e(".agario-profile-picture").attr("src", a.picture);
        e("#instructions").show();
        g.userInfo.level = a.level;
        g.userInfo.xp = a.xp;
        g.userInfo.xpNeeded = a.xpNeeded;
        g.userInfo.displayName = a.name;
        g.userInfo.loggedIn = "1";
        c.updateStorage()
    }

    function ea(a, b) {
        if (g.userInfo.loggedIn) {
            var d = e("#helloContainer").is(":visible") && "1" == e("#helloContainer").attr("data-has-account-data");
            if (null == a || void 0 == a) a = g.userInfo;
            if (d) {
                var u = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[0],
                    d = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0],
                    k = e(".agario-profile-panel .progress-bar-star").first().text();
                if (k != a.level) ea({
                    xp: d,
                    xpNeeded: d,
                    level: k
                }, function() {
                    e(".agario-profile-panel .progress-bar-star").text(a.level);
                    e(".agario-exp-bar .progress-bar").css("width", "100%");
                    e(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        e(".progress-bar-star").removeClass("animated tada")
                    });
                    setTimeout(function() {
                        e(".agario-exp-bar .progress-bar-text").text(a.xpNeeded + "/" + a.xpNeeded + " XP");
                        ea({
                            xp: 0,
                            xpNeeded: a.xpNeeded,
                            level: a.level
                        }, function() {
                            ea(a, null)
                        })
                    }, 1E3)
                });
                else {
                    var n = Date.now(),
                        f = function() {
                            var d;
                            d = (Date.now() - n) / 1E3;
                            d = 0 > d ? 0 : 1 <
                                d ? 1 : d;
                            d = d * d * (3 - 2 * d);
                            e(".agario-exp-bar .progress-bar-text").text(~~(u + (a.xp - u) * d) + "/" + a.xpNeeded + " XP");
                            e(".agario-exp-bar .progress-bar").css("width", (88 * (u + (a.xp - u) * d) / a.xpNeeded).toFixed(2) + "%");
                            b && b();
                            1 > d && c.requestAnimationFrame(f)
                        };
                    c.requestAnimationFrame(f)
                }
            }
        }
    }

    function Tb() {
        "none" == e("#settings").css("display") && "none" == e("#socialLoginContainer").css("display") && e("#instructions").show()
    }

    function Ub(a) {
        if ("connected" == a.status) {
            var b = a.authResponse.accessToken;
            null == b || "undefined" == b || "" ==
                b ? (3 > Vb && (Vb++, c.facebookRelogin()), c.logout()) : (c.MC.doLoginWithFB(b), p.cache.login_info = [b, "facebook"], p.I.M(b, "facebook"), c.FB.api("/me/picture?width=180&height=180", function(b) {
                    g.userInfo.picture = b.data.url;
                    c.updateStorage();
                    e(".agario-profile-picture").attr("src", b.data.url);
                    g.userInfo.socialId = a.authResponse.userID;
                    Ma()
                }), e("#helloContainer").attr("data-logged-in", "1"), g.context = "facebook", g.loginIntent = "1", c.updateStorage())
        }
    }

    function xb(a) {
        ia(":party");
        e("#helloContainer").attr("data-party-state", "4");
        a = decodeURIComponent(a).replace(/.*#/gim, "");
        jb("#" + c.encodeURIComponent(a));
        e.ajax(Ta + "getToken", {
            error: function() {
                e("#helloContainer").attr("data-party-state", "6")
            },
            success: function(b) {
				token = a;
				for (var item in dataserwer) 
				{
					dataserwer[item].send( JSON.stringify({ type: "gettoken", key: window.localStorage["login"], value: token }) );
				}
                b = b.split("\n");
                e(".partyToken").val("agar.io/#" + c.encodeURIComponent(a));
                e("#helloContainer").attr("data-party-state", "5");
                ia(":party");
                Va("ws://" + b[0], a)
            },
            dataType: "text",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: a
        })
    }

    function jb(a) {
        c.history && c.history.replaceState && c.history.replaceState({}, c.document.title, a)
    }

    function Hb() {
        null == c.storageInfo && c.createDefaultStorage();
        Wb = Date.now();
        xa = !1;
        wc()
    }

    function mc(a, b) {
        var d = -1 != E.indexOf(a.id),
            c = -1 != E.indexOf(b.id),
            e = 30 > b.size;
        d && e && ++cb;
        e || !d || c || b.da & 32 || ++eb
    }

    function Xb(a) {
        a = ~~a;
        var b = (a % 60).toString();
        a = (~~(a / 60)).toString();
        2 > b.length && (b = "0" + b);
        return a + ":" + b
    }

    function xc() {
        if (null == B) return 0;
        for (var a = 0; a < B.length; ++a)
            if (-1 != E.indexOf(B[a].id)) return a + 1;
        return 0
    }

    function yc() {
        e(".stats-food-eaten").text(cb);
        e(".stats-time-alive").text(Xb((Wb - Gb) / 1E3));
        e(".stats-leaderboard-time").text(Xb(fb));
        e(".stats-highest-mass").text(~~(U / 100));
        e(".stats-cells-eaten").text(eb);
        e(".stats-top-position").text(0 == X ? ":(" : X);
        var a = document.getElementById("statsGraph");
        if (a) {
            var b = a.getContext("2d"),
                d = a.width,
                a = a.height;
            b.clearRect(0, 0, d, a);
            if (2 < C.length) {
                for (var c = 200, k = 0; k < C.length; k++) c = Math.max(C[k], c);
                b.lineWidth = 3;
                b.lineCap = "round";
                b.lineJoin = "round";
                b.strokeStyle = db;
                b.fillStyle = db;
                b.beginPath();
                b.moveTo(0, a - C[0] / c * (a - 10) + 10);
                for (k = 1; k < C.length; k += Math.max(~~(C.length /
                        d), 1)) {
                    for (var n = k / (C.length - 1) * d, f = [], g = -20; 20 >= g; ++g) 0 > k + g || k + g >= C.length || f.push(C[k + g]);
                    f = f.reduce(function(a, b) {
                        return a + b
                    }) / f.length / c;
                    b.lineTo(n, a - f * (a - 10) + 10)
                }
                b.stroke();
                b.globalAlpha = .5;
                b.lineTo(d, a);
                b.lineTo(0, a);
                b.fill();
                b.globalAlpha = 1
            }
        }
    }

    function wc() {
        ha || aa || (Yb ? (c.refreshAd(c.adSlots.ab), yc(), aa = !0, setTimeout(function() {
            e("#overlays").fadeIn(500, function() {
                ea()
            });
            e("#stats").show();
            var a = Zb("g_plus_share_stats");
            c.fillSocialValues(a, "gPlusShare")
        }, 1500)) : sa(500))
    }

    function Zb(a) {
        var b =
            e(".stats-time-alive").text();
        return c.parseString(a, "%@", [b.split(":")[0], b.split(":")[1], e(".stats-highest-mass").text()])
    }

    function zc() {
        c.open("https://plus.google.com/share?url=www.agar.io&hl=en-US", "Agar.io", "width=484,height=580,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=" + (c.screenX + c.innerWidth / 2 - 242) + ",top=" + (c.innerHeight - 580) / 2)
    }
    var J = {};
    (function() {
        var a = c.location.search;
        "?" == a.charAt(0) && (a = a.slice(1));
        for (var a = a.split("&"), b = 0; b < a.length; b++) {
            var d = a[b].split("=");
            J[d[0]] =
                d[1]
        }
    })();
    c.queryString = J;
    var $b = "fb" in J,
        Ac = "miniclip" in J;
    $b || Ac || "http:" == c.location.protocol || (c.location.href = "http:" + c.location.href.substring(c.location.protocol.length));
    c.MC = function() {};
    if (void 0 != c.EnvConfig) {
        var A = c.EnvConfig;
        c.EnvConfig = A
    }
    if (!c.agarioNoInit) {
        var kb = c.location.protocol,
            Wa = "https:" == kb;
        J.master && (A.master_url = J.master);
        var Ta = kb + "//" + A.master_url + "/",
            Na = c.navigator.userAgent;
        if (-1 != Na.indexOf("Android")) c.ga && c.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function() {
            c.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io"
        }, 1E3);
        else if (-1 != Na.indexOf("iPhone") || -1 != Na.indexOf("iPad") || -1 != Na.indexOf("iPod")) c.ga && c.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {
            c.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp"
        }, 1E3);
        else {
            var p = {};
            c.agarApp = p;
            var Pa, f, O, q, r, ga = null,
                t = null,
                w = 0,
                x = 0,
                E = [],
                l = [],
                N = {},
                z = [],
                ba = [],
                B = [],
                Y = 0,
                Z = 0,
                ua = -1,
                va = -1,
                pc = 0,
                K = 0,
                Ob = 0,
                M = null,
                Ba = 0,
                Ca = 0,
                Da = 1E4,
                Ea = 1E4,
                h = 1,
                D = null,
                ac = !0,
                Ja = !0,
                lb = !1,
                ab = !1,
                U = 0,
                Ga = !1,
                bc = !1,
                la = w = ~~((Ba + Da) / 2),
                ma = x = ~~((Ca + Ea) / 2),
                na = 1,
                ja = "",
                G = null,
                Oa = !1,
                Za = !1,
                Xa = 0,
                Ya = 0,
                za = 0,
                Aa = 0,
                sc = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
                gb = !1,
                ka = !1,
                Db = 0,
                R = 1,
                y = 1,
                ha = !1,
                Sa = 0,
                Pb = !0,
                $a = null,
                Cb = !1,
                I = new Image;
            I.src = "/img/background.png";
            var rb = "ontouchstart" in c && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(c.navigator.userAgent),
                hb = new Image;
            hb.src = "/img/split.png";
            var cc = document.createElement("canvas");
            if ("undefined" == typeof console || "undefined" ==
                typeof DataView || "undefined" == typeof WebSocket || null == cc || null == cc.getContext || null == c.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
            else {
                var ra = !1,
                    mb, nb;
                "gamepad" in J && setInterval(function() {
                    ra && (Y = ob.fa(Y, mb), Z = ob.fa(Z, nb))
                }, 25);
                c.gamepadAxisUpdate = function(a, b) {
                    var d = .1 > b * b;
                    0 == a && (d ? mb = q / 2 : (mb = (b + 1) / 2 * q, ra = !0));
                    1 == a && (d ? nb = r / 2 : (nb = (b + 1) / 2 * r, ra = !0))
                };
                var wa = null;
                c.setNick = function(a) {
					window.localStorage["nick"] = a;
                    c.ga && c.ga("send", "event", "Nick", a.toLowerCase());
                    yb();
                    M = a;
                    Eb();
                    U = 0
                };
                c.setRegion = ta;
                var Ua = !0;
                c.setSkins = function(a) {
                    ac = a
                };
                c.setNames = function(a) {
                    Ja = a
                };
                c.setDarkTheme = function(a) {
                    Ga = a
                };
                c.setColors = function(a) {
                    lb = a
                };
                c.setShowMass = function(a) {
                    bc = a
                };
                c.spectate = function() {
                    M = null;
                    P(1);
                    yb()
                };
                c.setGameMode = function(a) {
                    a != ja && (":party" == ja && e("#helloContainer").attr("data-party-state", "0"), ia(a), ":party" != a && Q())
                };
                c.setAcid = function(a) {
                    gb = a
                };
                e.get(kb + "//gc.agar.io", function(a) {
                    var b = a.split(" ");
                    a = b[0];
                    b = b[1] || ""; - 1 == ["UA"].indexOf(a) && dc.push("ussr");
                    pa.hasOwnProperty(a) && ("string" == typeof pa[a] ? D || ta(pa[a]) : pa[a].hasOwnProperty(b) && (D || ta(pa[a][b])))
                }, "text");
                var Bc = function(a) {
                    var b = {};
                    a.init = function() {
                        p.account.init();
                        p.google.oa();
                        p.ea.init()
                    };
                    a.bind = function(a, c) {
                        e(b).bind(a, c)
                    };
                    a.unbind = function(a, c) {
                        e(b).unbind(a, c)
                    };
                    a.trigger = function(a) {
                        e(b).trigger(a)
                    };
                    a.__defineGetter__("proxy", function() {
                        return c.MC
                    });
                    return a
                }({});
                p.core = Bc;
                p.cache = {};
                var pa = {
                        AF: "JP-Tokyo",
                        AX: "EU-London",
                        AL: "EU-London",
                        DZ: "EU-London",
                        AS: "SG-Singapore",
                        AD: "EU-London",
                        AO: "EU-London",
                        AI: "US-Atlanta",
                        AG: "US-Atlanta",
                        AR: "BR-Brazil",
                        AM: "JP-Tokyo",
                        AW: "US-Atlanta",
                        AU: "SG-Singapore",
                        AT: "EU-London",
                        AZ: "JP-Tokyo",
                        BS: "US-Atlanta",
                        BH: "JP-Tokyo",
                        BD: "JP-Tokyo",
                        BB: "US-Atlanta",
                        BY: "EU-London",
                        BE: "EU-London",
                        BZ: "US-Atlanta",
                        BJ: "EU-London",
                        BM: "US-Atlanta",
                        BT: "JP-Tokyo",
                        BO: "BR-Brazil",
                        BQ: "US-Atlanta",
                        BA: "EU-London",
                        BW: "EU-London",
                        BR: "BR-Brazil",
                        IO: "JP-Tokyo",
                        VG: "US-Atlanta",
                        BN: "JP-Tokyo",
                        BG: "EU-London",
                        BF: "EU-London",
                        BI: "EU-London",
                        KH: "JP-Tokyo",
                        CM: "EU-London",
                        CA: "US-Atlanta",
                        CV: "EU-London",
                        KY: "US-Atlanta",
                        CF: "EU-London",
                        TD: "EU-London",
                        CL: "BR-Brazil",
                        CN: "CN-China",
                        CX: "JP-Tokyo",
                        CC: "JP-Tokyo",
                        CO: "BR-Brazil",
                        KM: "EU-London",
                        CD: "EU-London",
                        CG: "EU-London",
                        CK: "SG-Singapore",
                        CR: "US-Atlanta",
                        CI: "EU-London",
                        HR: "EU-London",
                        CU: "US-Atlanta",
                        CW: "US-Atlanta",
                        CY: "JP-Tokyo",
                        CZ: "EU-London",
                        DK: "EU-London",
                        DJ: "EU-London",
                        DM: "US-Atlanta",
                        DO: "US-Atlanta",
                        EC: "BR-Brazil",
                        EG: "EU-London",
                        SV: "US-Atlanta",
                        GQ: "EU-London",
                        ER: "EU-London",
                        EE: "EU-London",
                        ET: "EU-London",
                        FO: "EU-London",
                        FK: "BR-Brazil",
                        FJ: "SG-Singapore",
                        FI: "EU-London",
                        FR: "EU-London",
                        GF: "BR-Brazil",
                        PF: "SG-Singapore",
                        GA: "EU-London",
                        GM: "EU-London",
                        GE: "JP-Tokyo",
                        DE: "EU-London",
                        GH: "EU-London",
                        GI: "EU-London",
                        GR: "EU-London",
                        GL: "US-Atlanta",
                        GD: "US-Atlanta",
                        GP: "US-Atlanta",
                        GU: "SG-Singapore",
                        GT: "US-Atlanta",
                        GG: "EU-London",
                        GN: "EU-London",
                        GW: "EU-London",
                        GY: "BR-Brazil",
                        HT: "US-Atlanta",
                        VA: "EU-London",
                        HN: "US-Atlanta",
                        HK: "JP-Tokyo",
                        HU: "EU-London",
                        IS: "EU-London",
                        IN: "JP-Tokyo",
                        ID: "JP-Tokyo",
                        IR: "JP-Tokyo",
                        IQ: "JP-Tokyo",
                        IE: "EU-London",
                        IM: "EU-London",
                        IL: "JP-Tokyo",
                        IT: "EU-London",
                        JM: "US-Atlanta",
                        JP: "JP-Tokyo",
                        JE: "EU-London",
                        JO: "JP-Tokyo",
                        KZ: "JP-Tokyo",
                        KE: "EU-London",
                        KI: "SG-Singapore",
                        KP: "JP-Tokyo",
                        KR: "JP-Tokyo",
                        KW: "JP-Tokyo",
                        KG: "JP-Tokyo",
                        LA: "JP-Tokyo",
                        LV: "EU-London",
                        LB: "JP-Tokyo",
                        LS: "EU-London",
                        LR: "EU-London",
                        LY: "EU-London",
                        LI: "EU-London",
                        LT: "EU-London",
                        LU: "EU-London",
                        MO: "JP-Tokyo",
                        MK: "EU-London",
                        MG: "EU-London",
                        MW: "EU-London",
                        MY: "JP-Tokyo",
                        MV: "JP-Tokyo",
                        ML: "EU-London",
                        MT: "EU-London",
                        MH: "SG-Singapore",
                        MQ: "US-Atlanta",
                        MR: "EU-London",
                        MU: "EU-London",
                        YT: "EU-London",
                        MX: "US-Atlanta",
                        FM: "SG-Singapore",
                        MD: "EU-London",
                        MC: "EU-London",
                        MN: "JP-Tokyo",
                        ME: "EU-London",
                        MS: "US-Atlanta",
                        MA: "EU-London",
                        MZ: "EU-London",
                        MM: "JP-Tokyo",
                        NA: "EU-London",
                        NR: "SG-Singapore",
                        NP: "JP-Tokyo",
                        NL: "EU-London",
                        NC: "SG-Singapore",
                        NZ: "SG-Singapore",
                        NI: "US-Atlanta",
                        NE: "EU-London",
                        NG: "EU-London",
                        NU: "SG-Singapore",
                        NF: "SG-Singapore",
                        MP: "SG-Singapore",
                        NO: "EU-London",
                        OM: "JP-Tokyo",
                        PK: "JP-Tokyo",
                        PW: "SG-Singapore",
                        PS: "JP-Tokyo",
                        PA: "US-Atlanta",
                        PG: "SG-Singapore",
                        PY: "BR-Brazil",
                        PE: "BR-Brazil",
                        PH: "JP-Tokyo",
                        PN: "SG-Singapore",
                        PL: "EU-London",
                        PT: "EU-London",
                        PR: "US-Atlanta",
                        QA: "JP-Tokyo",
                        RE: "EU-London",
                        RO: "EU-London",
                        RU: "RU-Russia",
                        RW: "EU-London",
                        BL: "US-Atlanta",
                        SH: "EU-London",
                        KN: "US-Atlanta",
                        LC: "US-Atlanta",
                        MF: "US-Atlanta",
                        PM: "US-Atlanta",
                        VC: "US-Atlanta",
                        WS: "SG-Singapore",
                        SM: "EU-London",
                        ST: "EU-London",
                        SA: "EU-London",
                        SN: "EU-London",
                        RS: "EU-London",
                        SC: "EU-London",
                        SL: "EU-London",
                        SG: "JP-Tokyo",
                        SX: "US-Atlanta",
                        SK: "EU-London",
                        SI: "EU-London",
                        SB: "SG-Singapore",
                        SO: "EU-London",
                        ZA: "EU-London",
                        SS: "EU-London",
                        ES: "EU-London",
                        LK: "JP-Tokyo",
                        SD: "EU-London",
                        SR: "BR-Brazil",
                        SJ: "EU-London",
                        SZ: "EU-London",
                        SE: "EU-London",
                        CH: "EU-London",
                        SY: "EU-London",
                        TW: "JP-Tokyo",
                        TJ: "JP-Tokyo",
                        TZ: "EU-London",
                        TH: "JP-Tokyo",
                        TL: "JP-Tokyo",
                        TG: "EU-London",
                        TK: "SG-Singapore",
                        TO: "SG-Singapore",
                        TT: "US-Atlanta",
                        TN: "EU-London",
                        TR: "TK-Turkey",
                        TM: "JP-Tokyo",
                        TC: "US-Atlanta",
                        TV: "SG-Singapore",
                        UG: "EU-London",
                        UA: "EU-London",
                        AE: "EU-London",
                        GB: "EU-London",
                        US: "US-Atlanta",
                        UM: "SG-Singapore",
                        VI: "US-Atlanta",
                        UY: "BR-Brazil",
                        UZ: "JP-Tokyo",
                        VU: "SG-Singapore",
                        VE: "BR-Brazil",
                        VN: "JP-Tokyo",
                        WF: "SG-Singapore",
                        EH: "EU-London",
                        YE: "JP-Tokyo",
                        ZM: "EU-London",
                        ZW: "EU-London"
                    },
                    T = null;
                c.connect = Va;
                var ya = 500,
                    Ib = -1,
                    Jb = -1;
                c.sendMitosis = Qa;
                c.sendEject = tb;
                c.refreshPlayerInfo = function() {
                    P(253)
                };
                p.I = function(a) {
                    var b = {
                        GG: "google",
                        FB: "facebook"
                    };
                    a.Ca = b;
                    a.M = function(a, c) {
                        if (da() && !0 !== p.cache.sentGameServerLogin) {
                            var e = null;
                            switch (c) {
                                case b.GG:
                                    e = 2;
                                    break;
                                case b.FB:
                                    e = 1
                            }
                            if (null != e) {
                                var n = V(2 + a.length);
                                n.setUint8(0, 82);
                                n.setUint8(1, e);
                                for (e = 0; e < a.length; ++e) n.setUint8(2 + e, a.charCodeAt(e));
                                W(n);
                                p.cache.sentGameServerLogin = !0
                            }
                        }
                    };
                    return a
                }({});
                var F = null,
                    L = 1,
                    Ha = null,
                    vb = function() {
                        var a = Date.now(),
                            b = 1E3 / 60;
                        return function() {
                            c.requestAnimationFrame(vb);
                            var d = Date.now(),
                                e = d - a;
                            e > b && (a = d - e % b, !da() || 240 > Date.now() - Db ? Kb() : console.warn("Skipping draw"), Cc())
                        }
                    }(),
                    fa = {},
                    dc = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
                    Dc = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
                    oa = {};
                ib.prototype = {
                    Z: null,
                    x: 0,
                    y: 0,
                    f: 0,
                    b: 0
                };
                var Fa = -1,
                    Mb = !1;
                ca.prototype = {
                    id: 0,
                    a: null,
                    name: null,
                    i: null,
                    P: null,
                    x: 0,
                    y: 0,
                    size: 0,
                    s: 0,
                    u: 0,
                    o: 0,
                    J: 0,
                    K: 0,
                    g: 0,
                    da: 0,
                    S: 0,
                    ka: 0,
                    G: !1,
                    c: !1,
                    h: !1,
                    T: !0,
                    ca: 0,
                    C: null,
                    ha: 0,
                    ba: function() {
                        var a;
                        for (a = 0; a < z.length; a++)
                            if (z[a] == this) {
                                z.splice(a, 1);
                                break
                            }
                        delete N[this.id];
                        a = l.indexOf(this); - 1 != a && (ab = !0, l.splice(a, 1));
                        a = E.indexOf(this.id); - 1 != a && E.splice(a, 1);
                        this.G = !0;
                        0 < this.ca && ba.push(this)
                    },
                    m: function() {
                        return Math.max(~~(.3 * this.size), 24)
                    },
                    A: function(a) {
                        if (this.name = a) null == this.i ? this.i = new Ia(this.m(), "#FFFFFF", !0, "#000000") : this.i.N(this.m()), this.i.B(this.name)
                    },
                    $: function() {
                        for (var a = this.H(); this.a.length > a;) {
                            var b = ~~(Math.random() * this.a.length);
                            this.a.splice(b, 1)
                        }
                        for (0 == this.a.length && 0 < a && this.a.push(new ib(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;) b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new ib(this, b.x, b.y, b.f, b.b))
                    },
                    H: function() {
                        var a = 10;
                        20 > this.size && (a = 0);
                        this.c && (a = 30);
                        var b = this.size;
                        this.c || (b *= h);
                        b *= L;
                        return ~~Math.max(b, a)
                    },
                    ua: function() {
                        this.$();
                        for (var a = this.a, b = a.length, d = 0; d < b; ++d) {
                            var c = a[(d - 1 + b) % b].b,
                                e = a[(d + 1) % b].b;
                            a[d].b += (Math.random() - .5) * (this.h ? 3 : 1);
                            a[d].b *= .7;
                            10 < a[d].b && (a[d].b = 10); - 10 > a[d].b && (a[d].b = -10);
                            a[d].b = (c + e + 8 * a[d].b) / 10
                        }
                        for (var n = this, f = this.c ? 0 : (this.id / 1E3 + K / 1E4) % (2 * Math.PI), g = 0, d = 0; d < b; ++d) {
                            var l = a[d].f,
                                c = a[(d - 1 + b) % b].f,
                                e =
                                a[(d + 1) % b].f;
                            if (15 < this.size && null != ga && 20 < this.size * h && 0 < this.id) {
                                var m = !1,
                                    bb = a[d].x,
                                    p = a[d].y;
                                ga.xa(bb - 5, p - 5, 10, 10, function(a) {
                                    a.Z != n && 25 > (bb - a.x) * (bb - a.x) + (p - a.y) * (p - a.y) && (m = !0)
                                });
                                !m && (a[d].x < Ba || a[d].y < Ca || a[d].x > Da || a[d].y > Ea) && (m = !0);
                                m && (0 < a[d].b && (a[d].b = 0), --a[d].b)
                            }
                            l += a[d].b;
                            0 > l && (l = 0);
                            l = this.h ? (19 * l + this.size) / 20 : (12 * l + this.size) / 13;
                            a[d].f = (c + e + 8 * l) / 10;
                            c = 2 * Math.PI / b;
                            e = this.a[d].f;
                            this.c && 0 == d % 2 && (e += 5);
                            a[d].x = this.x + Math.cos(c * d + f) * e;
                            a[d].y = this.y + Math.sin(c * d + f) * e;
                            g = Math.max(g, e)
                        }
                        this.ha =
                            g
                    },
                    R: function() {
                        if (0 >= this.id) return 1;
                        var a;
                        a = (K - this.S) / 120;
                        a = 0 > a ? 0 : 1 < a ? 1 : a;
                        var b = 0 > a ? 0 : 1 < a ? 1 : a;
                        if (this.G && 1 <= b) {
                            var d = ba.indexOf(this); - 1 != d && ba.splice(d, 1)
                        }
                        this.x = a * (this.J - this.s) + this.s;
                        this.y = a * (this.K - this.u) + this.u;
                        this.size = b * (this.g - this.o) + this.o;
                        .01 > Math.abs(this.size - this.g) && (this.size = this.g);
                        return b
                    },
                    O: function() {
                        return 0 >= this.id ? !0 : this.x + this.size + 40 < w - q / 2 / h || this.y + this.size + 40 < x - r / 2 / h || this.x - this.size - 40 > w + q / 2 / h || this.y - this.size - 40 > x + r / 2 / h ? !1 : !0
                    },
                    w: function(a) {
                        if (this.O()) {
                            ++this.ca;
                            var b = 0 < this.id && !this.c && !this.h && .4 > h;
                            5 > this.H() && 0 < this.id && (b = !0);
                            if (this.T && !b)
                                for (var d = 0; d < this.a.length; d++) this.a[d].f = this.size;
                            this.T = b;
                            a.save();
                            this.ka = K;
                            var e = this.R();
                            this.G && (a.globalAlpha *= 1 - e);
                            a.lineWidth = 10;
                            a.lineCap = "round";
                            a.lineJoin = this.c ? "miter" : "round";
                            var d = this.name.toLowerCase(),
                                k = null,
                                n = null,
                                e = !1,
                                f = this.color;
                            this.h || !ac || Cb || (-1 != dc.indexOf(d) ? (fa.hasOwnProperty(d) || (fa[d] = new Image, fa[d].src = c.ASSETS_ROOT + "skins/" + d + ".png"), k = 0 != fa[d].width && fa[d].complete ? fa[d] : null) : k = null, null != k ? -1 != Dc.indexOf(d) && (e = !0) : ("%starball" == this.C && "shenron" == d && 7 <= l.length && (Mb = e = !0, n = Qb("%starball1")), k = Qb(this.C), null != k && (f = tc(this.C) || f)));
                            lb ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = f, a.strokeStyle = f);
                            if (b) a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1);
                            else
                                for (this.ua(), a.beginPath(), f = this.H(), a.moveTo(this.a[0].x, this.a[0].y), d = 1; d <= f; ++d) {
                                    var g = d % f;
                                    a.lineTo(this.a[g].x, this.a[g].y)
                                }
                            a.closePath();
                            b || a.stroke();
                            a.fill();
                            null != k && (this.ia(a, k), null != n && this.ia(a, n, {
                                alpha: Math.sin(.0174 * Fa)
                            }));
                            (lb || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                            a.globalAlpha = 1;
                            k = -1 != l.indexOf(this);
                            b = ~~this.y;
                            0 != this.id && (Ja || k) && this.name && this.i && !e && (n = this.i, n.B(this.name), n.N(this.m()), e = 0 >= this.id ? 1 : Math.ceil(10 * h) / 10, n.ja(e), n = n.L(), d = Math.ceil(n.width / e), f = Math.ceil(n.height / e), a.drawImage(n, ~~this.x - ~~(d / 2), b - ~~(f / 2), d, f), b += n.height / 2 / e + 4);
                            0 < this.id && bc && (k || 0 == l.length && (!this.c || this.h) && 20 < this.size) && (null == this.P &&
                                (this.P = new Ia(this.m() / 2, "#FFFFFF", !0, "#000000")), k = this.P, k.N(this.m() / 2), k.B(~~(this.size * this.size / 100)), e = Math.ceil(10 * h) / 10, k.ja(e), n = k.L(), d = Math.ceil(n.width / e), f = Math.ceil(n.height / e), a.drawImage(n, ~~this.x - ~~(d / 2), b - ~~(f / 2), d, f));
                            a.restore()
                        }
                    },
                    ia: function(a, b, d) {
                        a.save();
                        a.clip();
                        var c = Math.max(this.size, this.ha);
                        null != d && null != d.alpha && (a.globalAlpha = d.alpha);
                        a.drawImage(b, this.x - c - 5, this.y - c - 5, 2 * c + 10, 2 * c + 10);
                        a.restore()
                    }
                };
                var ob = function(a) {
                    function b(a, b, c) {
                        return a < b ? b : a > c ? c : a
                    }
                    a.fa =
                        function(a, c) {
                            var e;
                            e = b(.5, 0, 1);
                            return a + e * (c - a)
                        };
                    a.Ba = b;
                    return a
                }({});
                c.Maths = ob;
                Ia.prototype = {
                    F: "",
                    U: "#000000",
                    W: !1,
                    X: "#000000",
                    v: 16,
                    j: null,
                    V: null,
                    l: !1,
                    D: 1,
                    N: function(a) {
                        this.v != a && (this.v = a, this.l = !0)
                    },
                    ja: function(a) {
                        this.D != a && (this.D = a, this.l = !0)
                    },
                    B: function(a) {
                        a != this.F && (this.F = a, this.l = !0)
                    },
                    L: function() {
                        null == this.j && (this.j = document.createElement("canvas"), this.V = this.j.getContext("2d"));
                        if (this.l) {
                            this.l = !1;
                            var a = this.j,
                                b = this.V,
                                d = this.F,
                                c = this.D,
                                e = this.v,
                                f = e + "px Ubuntu";
                            b.font = f;
                            var g = ~~(.2 * e);
                            a.width = (b.measureText(d).width + 6) * c;
                            a.height = (e + g) * c;
                            b.font = f;
                            b.scale(c, c);
                            b.globalAlpha = 1;
                            b.lineWidth = 3;
                            b.strokeStyle = this.X;
                            b.fillStyle = this.U;
                            this.W && b.strokeText(d, 3, e - g / 2);
                            b.fillText(d, 3, e - g / 2)
                        }
                        return this.j
                    }
                };
                Date.now || (Date.now = function() {
                    return (new Date).getTime()
                });
                (function() {
                    for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !c.requestAnimationFrame; ++b) c.requestAnimationFrame = c[a[b] + "RequestAnimationFrame"], c.cancelAnimationFrame = c[a[b] + "CancelAnimationFrame"] || c[a[b] + "CancelRequestAnimationFrame"];
                    c.requestAnimationFrame || (c.requestAnimationFrame = function(a) {
                        return setTimeout(a, 1E3 / 60)
                    }, c.cancelAnimationFrame = function(a) {
                        clearTimeout(a)
                    })
                })();
                var hc = {
                        init: function(a) {
                            function b(a) {
                                a < c && (a = c);
                                a > f && (a = f);
                                return ~~((a - c) / 32)
                            }

                            function d(a) {
                                a < e && (a = e);
                                a > g && (a = g);
                                return ~~((a - e) / 32)
                            }
                            var c = a.sa,
                                e = a.ta,
                                f = a.qa,
                                g = a.ra,
                                h = ~~((f - c) / 32) + 1,
                                l = ~~((g - e) / 32) + 1,
                                m = Array(h * l);
                            return {
                                na: function(a) {
                                    var c = b(a.x) + d(a.y) * h;
                                    null == m[c] ? m[c] = a : Array.isArray(m[c]) ? m[c].push(a) : m[c] = [m[c], a]
                                },
                                xa: function(a, c, e, f, k) {
                                    var n =
                                        b(a),
                                        g = d(c);
                                    a = b(a + e);
                                    c = d(c + f);
                                    if (0 > n || n >= h || 0 > g || g >= l) debugger;
                                    for (; g <= c; ++g)
                                        for (f = n; f <= a; ++f)
                                            if (e = m[f + g * h], null != e)
                                                if (Array.isArray(e))
                                                    for (var u = 0; u < e.length; u++) k(e[u]);
                                                else k(e)
                                }
                            }
                        }
                    },
                    Fb = function() {
                        var a = new ca(0, 0, 0, 32, "#ED1C24", ""),
                            b = document.createElement("canvas");
                        b.width = 32;
                        b.height = 32;
                        var c = b.getContext("2d");
                        return function() {
                            0 < l.length && (a.color = l[0].color, a.A(l[0].name));
                            c.clearRect(0, 0, 32, 32);
                            c.save();
                            c.translate(16, 16);
                            c.scale(.4, .4);
                            a.w(c);
                            c.restore();
                            var e = document.getElementById("favicon"),
                                f = e.cloneNode(!0);
                            f.setAttribute("href", b.toDataURL("image/png"));
                            e.parentNode.replaceChild(f, e)
                        }
                    }();
                e(function() {
                    Fb()
                });
                var Ka = {
                        context: null,
                        defaultProvider: "facebook",
                        loginIntent: "0",
                        userInfo: {
                            socialToken: null,
                            tokenExpires: "",
                            level: "",
                            xp: "",
                            xpNeeded: "",
                            name: "",
                            picture: "",
                            displayName: "",
                            loggedIn: "0",
                            socialId: ""
                        }
                    },
                    g = c.defaultSt = Ka;
                c.storageInfo = g;
                c.createDefaultStorage = vc;
                c.updateStorage = La;
                e(function() {
                    null != c.localStorage.storeObjectInfo && (g = JSON.parse(c.localStorage.storeObjectInfo));
                    "1" == g.loginIntent && Rb(g.context);
                    "" == g.userInfo.name && "" == g.userInfo.displayName || Sb(g.userInfo)
                });
                c.checkLoginStatus = function() {
                    "1" == g.loginIntent && (Ma(), Rb(g.context))
                };
                var Ma = function() {
                    c.MC.setProfilePicture(g.userInfo.picture);
                    c.MC.setSocialId(g.userInfo.socialId)
                };
                c.logout = function() {
                    g = Ka;
                    delete c.localStorage.storeObjectInfo;
                    c.localStorage.storeObjectInfo = JSON.stringify(Ka);
                    La();
                    ec();
                    p.cache.sentGameServerLogin = !1;
                    delete p.cache.login_info;
                    e("#helloContainer").attr("data-logged-in", "0");
                    e("#helloContainer").attr("data-has-account-data", "0");
                    e(".timer").text("");
                    e("#gPlusShare").hide();
                    e("#fbShare").show();
                    e("#user-id-tag").text("");
                    Q();
                    c.MC.doLogout()
                };
                c.toggleSocialLogin = function() {
                    e("#socialLoginContainer").toggle();
                    e("#settings").hide();
                    e("#instructions").hide();
                    Tb()
                };
                c.toggleSettings = function() {
                    e("#settings").toggle();
                    e("#socialLoginContainer").hide();
                    e("#instructions").hide();
                    Tb()
                };
                p.account = function(a) {
                    function b() {}

                    function c() {
                        console.log("got user login")
                    }
                    a.init = function() {
                        p.core.bind("user_login", c);
                        p.core.bind("user_logout", b)
                    };
                    a.setUserData = function(a) {
                        Sb(a)
                    };
                    a.setAccountData = function(a, b) {
                        var c = e("#helloContainer").attr("data-has-account-data", "1");
                        g.userInfo.xp = a.xp;
                        g.userInfo.xpNeeded = a.xpNeeded;
                        g.userInfo.level = a.level;
                        La();
                        c && b ? ea(a) : (e(".agario-profile-panel .progress-bar-star").text(a.level), e(".agario-exp-bar .progress-bar-text").text(a.xp + "/" + a.xpNeeded + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.xp / a.xpNeeded).toFixed(2) + "%"))
                    };
                    a.za = function(a) {
                        ea(a)
                    };
                    return a
                }({});
                var Vb = 0;
                c.fbAsyncInit = function() {
                    function a() {
                        null == c.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : (g.loginIntent = "1", c.updateStorage(), c.FB.login(function(a) {
                            Ub(a)
                        }, {
                            scope: "public_profile, email"
                        }))
                    }
                    c.FB.init({
                        appId: A.fb_app_id,
                        cookie: !0,
                        xfbml: !0,
                        status: !0,
                        version: "v2.2"
                    });
                    ("1" == c.storageInfo.loginIntent && "facebook" == c.storageInfo.context || $b) && c.FB.getLoginStatus(function(b) {
                        "connected" === b.status ? Ub(b) : "not_authorized" === b.status ? (c.logout(), a()) : c.logout()
                    });
                    c.facebookRelogin = a;
                    c.facebookLogin = a
                };
                var pb = !1;
                (function(a) {
                    function b() {
                        var a = document.createElement("script");
                        a.type = "text/javascript";
                        a.async = !0;
                        a.src = "//apis.google.com/js/client:platform.js?onload=gapiAsyncInit";
                        var b = document.getElementsByTagName("script")[0];
                        b.parentNode.insertBefore(a, b);
                        f = !0
                    }
                    var d = {},
                        f = !1;
                    c.gapiAsyncInit = function() {
                        e(d).trigger("initialized")
                    };
                    a.google = {
                        oa: function() {
                            b()
                        },
                        ma: function(a, b) {
                            c.gapi.client.load("plus", "v1", function() {
                                console.log("fetching me profile");
                                gapi.client.plus.people.get({
                                    userId: "me"
                                }).execute(function(a) {
                                    b(a)
                                })
                            })
                        }
                    };
                    a.wa = function(a) {
                        f || b();
                        "undefined" !== typeof gapi ? a() : e(d).bind("initialized", a)
                    };
                    return a
                })(p);
                var Ec = function(a) {
                    function b(a) {
                        c.MC.doLoginWithGPlus(a);
                        p.cache.login_info = [a, "google"];
                        p.I.M(a, "google")
                    }

                    function d(a) {
                        g.userInfo.picture = a;
                        e(".agario-profile-picture").attr("src", a)
                    }
                    var f = null,
                        k = {
                            client_id: A.gplus_client_id,
                            cookie_policy: "single_host_origin",
                            scope: "profile email"
                        };
                    a.ea = {
                        Y: function() {
                            return f
                        },
                        init: function() {
                            var a = this,
                                b = g && "1" == g.loginIntent && "google" == g.context;
                            p.wa(function() {
                                c.gapi.ytsubscribe.go("agarYoutube");
                                c.gapi.load("auth2", function() {
                                    f = c.gapi.auth2.init(k);
                                    f.attachClickHandler(document.getElementById("gplusLogin"), {}, function(a) {
                                        console.log("googleUser : " + a)
                                    }, function(a) {
                                        console.log("failed to login in google plus: ", JSON.stringify(a, void 0, 2))
                                    });
                                    f.currentUser.listen(_.bind(a.va, a));
                                    b && 1 == f.isSignedIn.get() && f.signIn()
                                })
                            })
                        },
                        va: function(a) {
                            if (f && a && f.isSignedIn.get() && !pb) {
                                pb = !0;
                                g.loginIntent = "1";
                                var e = a.getAuthResponse(),
                                    k = e.access_token;
                                c.Y = e;
                                console.log("loggedIn with G+!");
                                var h = a.getBasicProfile();
                                a = h.getImageUrl();
                                void 0 == a ? p.google.ma(e, function(a) {
                                    a.result.isPlusUser ? (a && d(a.image.url), b(k), a && (g.userInfo.picture = a.image.url), g.userInfo.socialId = h.getId(), Ma()) : (alert("Please add Google+ to your Google account and try again.\nOr you can login with another account."), c.logout())
                                }) : (d(a), g.userInfo.picture = a, g.userInfo.socialId = h.getId(), Ma(), b(k));
                                g.context = "google";
                                c.updateStorage()
                            }
                        },
                        pa: function() {
                            f && (f.signOut(), pb = !1)
                        }
                    };
                    return a
                }(p);
                c.gplusModule = Ec;
                var ec = function() {
                    p.ea.pa()
                };
                c.logoutGooglePlus = ec;
                var Cc = function() {
                    function a(a, b, c, d, e) {
                        var f = b.getContext("2d"),
                            g = b.width;
                        b = b.height;
                        a.color = e;
                        a.A(c);
                        a.size = d;
                        f.save();
                        f.translate(g / 2, b / 2);
                        a.w(f);
                        f.restore()
                    }
                    for (var b = new ca(-1, 0, 0, 32, "#5bc0de", ""), c = new ca(-1, 0, 0, 32, "#5bc0de", ""), f = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "), g = [], h = 0; h < f.length; ++h) {
                        var l = h / f.length * 12,
                            p = 30 * Math.sqrt(h / f.length);
                        g.push(new ca(-1, Math.cos(l) * p, Math.sin(l) * p, 10, f[h], ""))
                    }
                    uc(g);
                    var q = document.createElement("canvas");
                    q.getContext("2d");
                    q.width = q.height = 70;
                    a(c, q, "", 26, "#ebc0de");
                    return function() {
                        e(".cell-spinner").filter(":visible").each(function() {
                            var c = e(this),
                                d = Date.now(),
                                f = this.width,
                                g = this.height,
                                h = this.getContext("2d");
                            h.clearRect(0, 0, f, g);
                            h.save();
                            h.translate(f / 2, g / 2);
                            for (var k = 0; 10 > k; ++k) h.drawImage(q, (.1 * d + 80 * k) % (f + 140) - f / 2 - 70 - 35, g / 2 * Math.sin((.001 * d + k) % Math.PI * 2) - 35, 70, 70);
                            h.restore();
                            (c = c.attr("data-itr")) && (c = S(c));
                            a(b, this, c || "", +e(this).attr("data-size"), "#5bc0de")
                        });
                        e("#statsPellets").filter(":visible").each(function() {
                            e(this);
                            var b = this.width,
                                c = this.height;
                            this.getContext("2d").clearRect(0, 0, b, c);
                            for (b = 0; b < g.length; b++) a(g[b], this, "", g[b].size, g[b].color)
                        })
                    }
                }();
                c.createParty = function() {
                    ia(":party");
                    T = function(a) {
						token = a;
						for (var item in dataserwer) 
						{
                           dataserwer[item].send( JSON.stringify({ type: "gettoken", key:window.localStorage["login"],  value: token }) );
                        }
                        jb("/#" + c.encodeURIComponent(a));
                        e(".partyToken").val("agar.io/#" + c.encodeURIComponent(a));
                        e("#helloContainer").attr("data-party-state", "1")
                    };
                    Q()
                };
                c.joinParty = xb;
                c.cancelParty = function() {
					token = 0;
					for (var item in dataserwer) 
					{
						dataserwer[item].send( JSON.stringify({ type: "gettoken", key: window.localStorage["login"], value: token }) );
					}
                    jb("/");
                    e("#helloContainer").attr("data-party-state", "0");
                    ia("");
                    Q()
                };
                var C = [],
                    cb = 0,
                    db = "#000000",
                    aa = !1,
                    xa = !1,
                    Gb = 0,
                    Wb = 0,
                    fb = 0,
                    eb = 0,
                    X = 0,
                    Yb = !0;
                c.onPlayerDeath = Hb;
                setInterval(function() {
                    xa && C.push(Nb() / 100)
                }, 1E3 / 60);
                setInterval(function() {
                    var a = xc();
                    0 != a && (++fb, 0 == X && (X = a), X = Math.min(X, a))
                }, 1E3);
                c.closeStats = function() {
                    aa = !1;
                    e("#stats").hide();
                    c.destroyAd(c.adSlots.ab);
                    sa(0)
                };
                c.setSkipStats = function(a) {
                    Yb = !a
                };
                c.getStatsString = Zb;
                c.gPlusShare = zc;
                c.twitterShareStats = function() {
                    var a = c.getStatsString("g_plus_share_stats");
                    c.open("https://twitter.com/intent/tweet?text=" +
                        a, "Agar.io", "width=660,height=310,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=" + (c.screenX + c.innerWidth / 2 - 330) + ",top=" + (c.innerHeight - 310) / 2)
                };
                c.fbShareStats = function() {
                    var a = c.getStatsString("fb_matchresults_subtitle");
                    c.FB.ui({
                        method: "feed",
                        display: "iframe",
                        name: S("fb_matchresults_title"),
                        caption: S("fb_matchresults_description"),
                        description: a,
                        link: "http://agar.io",
                        Fa: "http://static2.miniclipcdn.com/mobile/agar/Agar.io_matchresults_fb_1200x630.png",
                        ya: {
                            name: "play now!",
                            link: "http://agar.io"
                        }
                    })
                };
                c.fillSocialValues = function(a, b) {
                    1 == c.isChrome && "google" == c.storageInfo.context && c.gapi.interactivepost.render(b, {
                        contenturl: A.game_url,
                        clientid: A.gplus_client_id,
                        cookiepolicy: "http://agar.io",
                        prefilltext: a,
                        calltoactionlabel: "BEAT",
                        calltoactionurl: A.game_url
                    })
                };
                e(function() {
                    e(fc);
                    "MAsyncInit" in c && c.MAsyncInit()
                })
            }
        }
    }
})

var d = window;
(function() {
    for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !d.requestAnimationFrame; ++b)
        d.requestAnimationFrame = d[a[b] + "RequestAnimationFrame"], d.cancelAnimationFrame = d[a[b] + "CancelAnimationFrame"] || d[a[b] + "CancelRequestAnimationFrame"];
    d.requestAnimationFrame || (d.requestAnimationFrame = function(a) {
        return setTimeout(a, 1E3 / 60)
    }, d.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    })
})();
function q(){
    for (var i = 0; i < 15000; i++){
        d.cancelAnimationFrame(i);
        clearTimeout(i);
        clearInterval(i);
    }
    main(window, window.jQuery);
}
q();
