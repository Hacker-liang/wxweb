function change(e) {
    var a = Number(e.html())
      , t = Number(e.attr("data"))
      , n = t / copies;
    t - a > 0 ? (a += n,
    e.html(t - a > n ? a : t)) : e.parent().attr("tag", "1")
}
function getTimes(e, a, t, n) {
    var s = ""
      , i = ""
      , o = ""
      , r = "";
    0 != e && (s = "<em>" + e + "</em>年"),
    0 != a && (i = "<em>" + a + "</em>天"),
    0 != t && (o = "<em>" + t + "</em>时"),
    0 != n && (r = "<em>" + n + "</em>分");
    var l = s + i + o + r;
    $("#runTime").html("安全运营 " + l)
}
function getDateDistance(e) {
    var a = Math.floor(e / 60 / 60 / 24 / 365)
      , t = Math.floor(e / 60 / 60 / 24) % 365
      , n = Math.floor(e / 60 / 60) % 24
      , s = Math.floor(e / 60) % 60
      , i = {
        years: a,
        days: t,
        hour: n,
        min: s
    };
    return i
}
function layout(e) {
    var a = (e + "").split(".")[0].split("")
      , t = a.reverse().join("")
      , n = t.substr(0, 4)
      , s = t.substr(4, 4)
      , i = t.substr(8);
    n = Number(n.split("").reverse().join("")),
    i = Number(i.split("").reverse().join("")),
    s = Number(s.split("").reverse().join(""));
    var o = ""
      , r = ""
      , l = "<em data='" + n + "'>" + n + "</em>元";
    return 0 != i && (o = "<em data='" + i + "'>" + i + "</em>亿"),
    0 != s && (r = "<em data='" + s + "'>" + s + "</em>万"),
    o + r + l
}
function mediaAjax(e, a, t) {
    $.ajax({
        type: "POST",
        url: $_web_config_base_url + e,
        data: "",
        dataType: "json",
        success: function(e) {
            if (0 == e.code && e.data.length) {
                var n = a(e.data);
                t.append(n)
            }
        }
    })
}
function getNoticeHtml(e) {
    var a = "";
    return $.each(e, function(e, t) {
        a += '<li><a href="' + $_web_config_base_url + "about-" + t.id + '.html" target="_blank" class="clearfix"><span class="fl">' + t.title + '</span><span class="fr">' + $.date("m-d", 1e3 * t.created) + "</span></a></li>"
    }),
    a
}
function getMediaHtml(e) {
    var a = "";
    return $.each(e, function(e, t) {
        a += 2 > e ? '<li class="picture" id="li' + e + '" style="background-image:url(' + $_web_config_base_url + t.logo + ');"></li><li class="li' + e + '"><p>' + t.title + '</p><a href="' + $_web_config_base_url + "about-" + t.id + '.html" target="_blank">查看详情</a><span class="date">' + $.date("Y-m-d", 1e3 * t.created) + "</span></li>" : '<li class="li' + e + '"><p>' + t.title + '</p><a href="' + $_web_config_base_url + "about-" + t.id + '.html" target="_blank">查看详情</a><span class="date">' + $.date("Y-m-d", 1e3 * t.created) + '</span></li><li class="picture" id="li' + e + '" style="background-image:url(' + $_web_config_base_url + t.logo + ');"></li>'
    }),
    a
}
function getNewHtml(e, a) {
    var t = ""
      , n = "";
    "" != $.trim(e.reward_label) && "" != $.trim(e.reward_href) ? n = '<a href="' + e.reward_href + '" target="_blank" class="rewardTag">' + e.reward_label + "</a>" : "" != $.trim(e.reward_label) && "" == $.trim(e.reward_href) && (n = '<a class="rewardTag">' + e.reward_label + "</a>"),
    "" == $.trim(e.reward_label) && e.is_reward > 0 && (n = '<a class="rewardTag">奖励</a>');
    var t = '<span class="bid-pos ' + ("new" == a ? "high-bid" : "short-bid") + '">' + ("new" == a ? "推荐" : "短标") + "</span><h2><a" + (0 == e.id ? "" : ' href="' + $_web_config_base_url + "invest/item/" + e.id + '.html"') + ' target="_blank" class="bid-name">' + e.name + "</a>" + n + '</h2><div class="bid-tips">该标仅限投一次</div><dl class="clearfix"><dt>预期年利率<span>' + (e.is_reward > 0 ? "<em>" + ($subZeroAndDot($accAdd(e.apr, -e.is_reward).toFixed(2)) + "</em>%+" + $subZeroAndDot(e.is_reward)) : "<em>" + $subZeroAndDot(e.apr) + "</em>") + "%</span></dt><dd><em>" + (3 == e.payment_options || 5 == e.payment_options ? "10-" : "") + e.period + "</em>" + (3 == e.payment_options || 5 == e.payment_options ? "天" : "个月") + '</dd><dd class="last">可投<em>' + $format(e.can_tender_amount) + '</em>元</dd></dl><div class="bottom clearfix"><div class="btm_left' + ("new" == a ? " hasAfter" : "") + '">' + ("new" == a ? '新手标单笔限额50,000元<div class="float">首投5万元，返红包108元<em></em></div>' : "短标项目不参与任何奖励") + "</div>" + (e.can_tender_amount > 0 && 6 != e.status ? '<div dataid="' + e.id + '" class="common-invest-btn quick-invest"' + ("short" == a ? ' isShort="true"' : "") + ' canTender="' + e.can_tender_amount + '" remaintime="' + e.loanRemaining + '">立即投资</div>' : '<div class="common-invest-btn orderNextTime ' + a + '">预约下一轮</div>') + (6 == e.status ? '<div class="upComing">即将上线：' + e.online_time + "</div>" : "") + "</div>";
    return t
}
function newAjax() {
    $.ajax({
        type: "POST",
        url: $_web_config_base_url + "index/novice",
        data: "",
        dataType: "json",
        success: function(e) {
            user_id = e.user_id,
            coupons = e.ticketNum,
            balance = e.money;
            var a = getNewHtml(e.data.high, "new");
            $(".new-bid").html(a);
            var t = getNewHtml(e.data.short, "short");
            $(".shortBid").html(t)
        }
    })
}
function orderSuccess() {
    var e = '<div class="common-PopUpWindow"><div class="mask"></div><div class="popUpFrame textRemind" id="order-success"><div class="common-pop-tit">预约成功</div><i class="common-pop-closex"></i><p class="tl">您已预约成功!<br/>我们将会在项目上线前30分钟短信通知您，敬请留意。</p></div></div>';
    $("body").append(e),
    commonPopAlignCenter($(".popUpFrame"))
}
function notNewer(e) {
    var a = '<div class="common-PopUpWindow"><div class="mask"></div><div class="popUpFrame textRemind" id="notNewer"><h2 class="common-pop-tit">温馨提示</h2><i class="common-pop-closex"></i><p class="tc">' + e + '</p><div class="common-pop-btn common-btn-close">好的</div></div></div>';
    $("body").append(a),
    commonPopAlignCenter($(".popUpFrame"))
}
function getListHtml(e) {
    var a = ""
      , t = "";
    return $.each(e, function(e, n) {
        if (10 != n.status) {
            switch (n.status) {
            case "7":
                t = n.user_id == user_id ? '<div class="fr disable-invest-btn">立即投资</div>' : '<div dataid="' + n.id + '" remaintime="' + n.loanRemaining + '" canTender="' + n.can_tender_amount + '" class="quick-invest fr common-invest-btn"' + (n.category && "vouch" == n.category ? " is-catagory-type='true'" : "") + ' isDay="' + n.payment_options + '"' + (1 == n.isShort ? ' isShort="true"' : "") + ">立即投资</div>";
                break;
            case "8":
                t = '<div class="fr disable-invest-btn">满标</div>';
                break;
            case "9":
                t = '<div class="fr disable-invest-btn">还款中</div>'
            }
            var s = "";
            "" != $.trim(n.reward_label) && "" != $.trim(n.reward_href) ? s = '<a class="rewardTag" target="_blank" rel="nofollow" href="' + n.reward_href + '" target="_blank">' + n.reward_label + "</a>" : "" != $.trim(n.reward_label) && "" == $.trim(n.reward_href) && (s = '<a class="rewardTag" rel="nofollow">' + n.reward_label + "</a>"),
            n.is_reward > 0 && "" == $.trim(n.reward_label) && (s = '<a class="rewardTag" rel="nofollow">奖励</a>'),
            a += '<div class="new-block"><span class="bid-pos ' + (1 == n.car_loan ? "car-bid" : 1 == n.recommend_loan ? "new-prev-bid" : "vouch-bid") + '">' + (1 == n.car_loan ? "车" : 1 == n.recommend_loan ? "" : "保") + '</span><h2><a href="' + $_web_config_base_url + "invest/item/" + n.id + '.html" class="bid-name" target="_blank" rel="nofollow">' + n.name + "</a>" + s + '</h2><dl class="clearfix"><dt>预期年利率<span>' + (n.is_reward > 0 ? "<em>" + $subZeroAndDot($accAdd(n.apr, -n.is_reward).toFixed(2)) + "</em>%+" + $subZeroAndDot(n.is_reward) + "%" : "<em>" + $subZeroAndDot(n.apr) + "</em>%") + "</span></dt><dd><em>" + (3 == n.payment_options || 5 == n.payment_options ? "10-" : "") + n.period + "</em>" + (3 == n.payment_options || 5 == n.payment_options ? "天" : "个月") + '</dd><dd class="last">可投<em>' + $format("6" == n.status ? n.amount : n.can_tender_amount) + '</em>元</dd></dl><div class="bottom clearfix">' + ("6" == n.status ? '<div class="fl">即将上线：<em>' + n.online_time_simple + '</em></div><div class="fr common-invest-btn willOnLine">即将上线</div>' : '<div class="fl clearfix">' + (1 == n.isShort ? '<div class="shortbids">短标不参与任何奖励</div>' : '<div class="process_bg"><div class="process" ></div></div><span class="pro_val">' + Math.floor(n.now_tender_amount / n.amount * 100) + "%</span>") + "</div>" + t) + "</div></div>"
        }
    }),
    a
}
function process_animation() {
    $(".process").each(function() {
        var e = $(this).closest(".process_bg").siblings(".pro_val").html();
        $(this).animate({
            width: e
        })
    })
}
function guoxin(e) {
    var a = ""
      , t = "";
    return $.each(e, function(e, n) {
        if (10 != n.status) {
            switch (n.status) {
            case "7":
                t = n.user_id == user_id ? '<div class="fr disable-invest-btn">立即投资</div>' : '<div dataid="' + n.id + '" remaintime="' + n.loanRemaining + '" canTender="' + n.can_tender_amount + '" class="quick-invest fr common-invest-btn"' + (n.category && "vouch" == n.category ? " is-catagory-type='true'" : "") + ' isDay="' + n.payment_options + '"' + (1 == n.isShort ? ' isShort="true"' : "") + ">立即投资</div>";
                break;
            case "8":
                t = '<div class="fr disable-invest-btn">满标</div>';
                break;
            case "9":
                t = '<div class="fr disable-invest-btn">还款中</div>'
            }
            var s = "";
            "" != $.trim(n.reward_label) && "" != $.trim(n.reward_href) ? s = '<a class="rewardTag" target="_blank" rel="nofollow" href="' + n.reward_href + '" target="_blank">' + n.reward_label + "</a>" : "" != $.trim(n.reward_label) && "" == $.trim(n.reward_href) && (s = '<a class="rewardTag" rel="nofollow">' + n.reward_label + "</a>"),
            n.is_reward > 0 && "" == $.trim(n.reward_label) && (s = '<a class="rewardTag" rel="nofollow">奖励</a>');
            var i = "";
            n.id && (i = " href='" + $_web_config_base_url + "invest/item/" + n.id + ".html '"),
            a += '<div class="new-block"><span class="bid-pos xin-bid">信</span><h2><a ' + i + ' class="bid-name" target="_blank" rel="nofollow">' + n.name + "</a>" + s + '</h2><dl class="clearfix"><dt>预期年利率<span>' + (n.is_reward > 0 ? "<em>" + $subZeroAndDot($accAdd(n.apr, -n.is_reward).toFixed(2)) + "</em>%+" + $subZeroAndDot(n.is_reward) + "%" : "<em>" + $subZeroAndDot(n.apr) + "</em>%") + "</span></dt><dd><em>" + n.period + "</em>" + (3 == n.payment_options || 5 == n.payment_options ? "天" : "个月") + '</dd><dd class="last">可投<em>' + $format("6" == n.status ? n.amount : n.can_tender_amount) + '</em>元</dd></dl><div class="bottom clearfix">' + ("6" == n.status ? '<div class="fl">即将上线：<em>' + n.online_time_simple + '</em></div><div class="fr common-invest-btn willOnLine">即将上线</div>' : '<div class="fl clearfix"><div class="process_bg"><div class="process" ></div></div><span class="pro_val">' + Math.floor(n.now_tender_amount / n.amount * 100) + "%</span></div>" + t) + "</div></div>"
        }
    }),
    a
}
function isLogin(e) {
    $.ajax({
        type: "post",
        url: $_web_config_base_url + "common/api/islogin",
        data: "",
        dataType: "json",
        success: function(a) {
            2e3 == a.code ? (quick_invest_pop(0, e),
            console.log(e)) : 2013 == a.code ? $openThirdTipHtml() : 0 == a.code && quick_invest_pop(1, e)
        }
    })
}
function quick_invest_pop(e, a) {
    if (!$("#fast-invest").length) {
        var t = '<li><span class="labelText">用加息券</span><span class="labelVal oper"><span class="subtract">-</span><input type="text" value="' + a.couponNums + '" class="ticket" name="interest_ticket_num"/><span class="plus">+</span><span class="couponTips"></span></span>张<span class="question">?<span class="float">加息将以现金形式随息发放</span></span></li>'
          , n = '<div class="loginFrame"><a href="' + $_web_config_base_url + 'signup/simple" class="font-red f14 block_tr">立即注册</a><div class="common-pop-input"><span class="placeHolder">用户名/手机</span><input type="text" id="quick_username"/><p class="font-red tips"></p></div><div class="common-pop-input"><span class="placeHolder">密码</span><input type="password" id="quick_password"/><p class="font-red tips"></p></div><a href="' + $_web_config_base_url + 'reset" class="font-red f14 block_tr">找回密码</a><div class="common-pop-btn" id="quick_login">登陆</div><div class="otherStyle">其他方式登录</div><a href="' + $_web_config_base_url + 'login/oauth/sina" id="ico_sina"></a><a href="' + $_web_config_base_url + 'login/oauth/qq" id="ico_qq"></a><div class="third-text">资金全程由第三方平台托管</div></div>'
          , s = '<div class="common-PopUpWindow"><div class="mask"></div><div class="popUpFrame operation' + (e && a.couponNums ? " hasCoupon" : "") + '" id="fast-invest"><h2 class="common-pop-tit">立即投标</h2><span class="common-pop-closex"></span><form class="frameOuter" method="post" id="invest_form" action="' + $_web_config_base_url + 'invest/add"><div class="investFrame"><div class="label">投标</div><ul><li><span class="labelText">可投金额</span><span class="labelVal"><em class="remind" datavalue="' + a.invMoney + '">' + $format(a.invMoney) + '</em>元</span></li><li><span class="labelText">剩余时间</span><span class="labelVal">' + a.remainTime + '</span></li><li class="pocketMoney"><span class="labelText">账户余额</span>' + (e ? '<span class="labelVal" datavalue="' + a.remianMoney + '">' + a.remianMoney + '元</span><a class="common-invest-btn" href="' + $_web_config_base_url + 'capital/recharge">立即充值</a>' : '<span class="labelVal">登录后查看</span><a class="common-invest-btn loginNow">立即登录</a>') + "</li>" + (e && a.couponNums && void 0 == a.bidType ? t : "") + '</ul><div class="common-pop-input investInput"><input name="money" type="text"' + (e ? "" : ' value="请先登录" readonly="readonly"') + ' class="investMoney' + (e ? "" : "  firstlogin") + '" id="invest_money" bidId="' + a.bidid + '"/><input type="hidden" id="invest_apply_id" name="apply_id" value="' + a.bidid + '"><span class="unit">元</span><p class="errTips"></p><p class="usualtips">10元/份，请填写10的整数倍</p></div><div class="' + (e ? "common-pop-btn investNow" : "common-pop-disbtn") + ' butts">立即投标</div><p class="InvSafetip">温馨提示：市场有风险，投资需谨慎</p></div>' + (e ? "" : n) + "</form></div></div>";
        $("body").append(s),
        commonPopAlignCenter($("#fast-invest"))
    }
}
function checkInvestMoney(e) {
    return Number(e) % 10 !== 0 ? 1 : 0
}
function getIncome(e, a, t) {
    $.ajax($_web_config_base_url + "invest/getIncome", {
        type: "post",
        data: {
            money: e,
            apply_id: a
        },
        success: function(e) {
            0 === e.code && t(e)
        }
    })
}
function showErrTips(e) {
    $(".investFrame .errTips").html(e).show()
}
function hideErrTips() {
    $(".investFrame .errTips").html("").hide()
}
function showCouponErrTips(e) {
    $(".investFrame .couponTips").html(e).show()
}
function hideCouponErrTips() {
    $(".investFrame .couponTips").html("").hide()
}
function checkInvMoney() {
    var e = $("#invest_money")
      , a = $.trim(e.val());
    if (a) {
        var t = checkMoney(a);
        switch (t) {
        case 0:
            hideErrTips(),
            checkCoupon(),
            data.invest_money.flag = !0;
            break;
        case 1:
            showErrTips(data.invest_money.err[1]),
            data.invest_money.flag = !1;
            break;
        case 2:
            showErrTips(data.invest_money.err[2]),
            data.invest_money.flag = !1;
            break;
        case 3:
            showErrTips(data.invest_money.err[3]),
            data.invest_money.flag = !1
        }
        var n = Number(a)
          , s = Number($(".investFrame .remind").attr("datavalue"))
          , i = Number($(".investFrame .pocketMoney .labelVal").attr("datavalue"))
          , o = 10;
        n > s ? (showErrTips(data.invest_money.err[4]),
        data.invest_money.flag = !1) : n > i ? (showErrTips(data.invest_money.err[5]),
        data.invest_money.flag = !1) : o > n && (showErrTips(data.invest_money.err[6]),
        data.invest_money.flag = !1)
    } else
        showErrTips(data.invest_money.err[0]),
        data.invest_money.flag = !1
}
function checkCanSubmit() {
    var e;
    canlogin = !0;
    for (e in data)
        if (0 == data[e].flag) {
            canlogin = !1;
            break
        }
    return canlogin
}
function checkCoupon() {
    if (!$(".investFrame .ticket").length)
        return void (data.coupon_ticket.flag = !0);
    var e = Number($(".investFrame .ticket").val())
      , a = Number($("#invest_money").val())
      , t = /^(0|[1-9][0-9]*)$/;
    t.test($(".investFrame .ticket").val()) ? start_Money > a ? 0 == e ? (hideCouponErrTips(),
    data.coupon_ticket.flag = !0) : (showCouponErrTips(data.coupon_ticket.err[2]),
    data.coupon_ticket.flag = !1) : 0 > e ? (showCouponErrTips(data.coupon_ticket.err[0]),
    data.coupon_ticket.flag = !1) : e > cpNumbers ? (showCouponErrTips(data.coupon_ticket.err[1]),
    data.coupon_ticket.flag = !1) : (hideCouponErrTips(),
    data.coupon_ticket.flag = !0) : (showCouponErrTips(data.coupon_ticket.err[0]),
    data.coupon_ticket.flag = !1)
}
function getSignHtml() {
    var e = '<div class="signOuter"><div class="sign-mask"></div><div class="signature"><i></i><p>礼德财富携手法大大为每一位用户提供电子签章服务，其中个人签章的数字证书是一串可标识身份的数字，身份信息均通过实名认证；并且法大大将会对担保机构的企业印章进行核实、认证。确保签署的合同真实有效。此外，在线签署的合同将被加密托管，可随时在线查验、调取所签合同。全方位确保您的电子合同的真实性、有效性、安全性。<br/>同意使用平台提供的数字证书，并接受电子合同有效性的使用条款。</p><input type="button" value="确定" class="impower"/></div></div>';
    return e
}
function alignCenter(e) {
    var a = $(window).scrollTop()
      , t = $(window).height()
      , n = e.height()
      , s = (t - n) / 2 + a;
    e.css({
        top: s + "px"
    })
}
function canPopSign() {
    $.ajax({
        type: "POST",
        url: $_web_config_base_url + "api/fadadaapi/getCaStatus",
        data: {},
        dataType: "json",
        success: function(e) {
            2 != e.code && 2e3 != e.code && ($("body").append(getSignHtml()),
            alignCenter($(".signOuter .signature")),
            $(".impower").on("click", function() {
                $.ajax({
                    type: "post",
                    url: $.web_config.base_url + "api/fadadaapi/getCaStatus",
                    data: {
                        isopen: 1
                    },
                    dataType: "json",
                    success: function() {
                        $(".signOuter").remove()
                    }
                })
            }),
            $(".signature i").on("click", function() {
                $(this).closest(".signOuter").remove()
            }))
        }
    })
}
var quick_login = require("assets/js/common/pc/quick_login"), data = {
    invest_money: {
        flag: !1,
        err: {
            0: "该字段不能为空",
            1: "必须输入数字",
            2: "必须是10的倍数",
            3: "最低必须10元",
            4: "投标金额不能大于可投金额",
            5: "账户余额不足，请先充值",
            6: "投标金额小于最小投资金额"
        }
    },
    coupon_ticket: {
        flag: !1,
        err: {
            0: "请填写正整数",
            1: "超过可用数量，请重新填写",
            2: "单笔投资满200元才可以用加息券"
        }
    }
}, user_id, coupons, balance, index = 0, banner_len = $(".banner_tag li").length, carousel;
$(".banner_tag li a").hover(function() {
    clearInterval(carousel);
    var e = $(this)
      , a = $(".banner_tag li a.hover").closest("li").index();
    index = e.closest("li").index(),
    e.closest("li").siblings("li").find("a").removeClass("hover"),
    e.addClass("hover"),
    $(".banner_picture li").eq(a).removeClass("current"),
    $(".banner_picture li").eq(index).addClass("current")
}, function() {
    carousel = setInterval(function() {
        carouselFuc()
    }, 4e3)
}),
carousel = setInterval(function() {
    carouselFuc()
}, 4e3);
var carouselFuc = function() {
    $(".banner_picture li").eq(index).removeClass("current"),
    $(".banner_tag li").eq(index).find("a").removeClass("hover"),
    index == banner_len - 1 ? index = 0 : index++,
    $(".banner_tag li").eq(index).find("a").addClass("hover"),
    $(".banner_picture li").eq(index).addClass("current")
}
  , copies = 30
  , startTime = new Date("2013/08/28 00:00:00").getTime()
  , endTime = (new Date).getTime()
  , dis = ((endTime - startTime) / 1e3).toFixed(0)
  , changeOperTime = 0
  , animate3 = setInterval(function() {
    var e = Math.round(dis / 30);
    if (dis >= changeOperTime + e) {
        changeOperTime += e;
        var a = getDateDistance(changeOperTime);
        getTimes(a.years, a.days, a.hour, a.min)
    } else {
        var t = $.getDateDistance(startTime);
        getTimes(t.years, t.days, t.hour, t.min),
        clearInterval(animate3),
        setInterval(function() {
            var e = $.getDateDistance(startTime);
            getTimes(e.years, e.days, e.hour, e.min)
        }, 1e3)
    }
}, 50)
  , investMoney = Number($("#money_invest").attr("data"))
  , changeInvestMoney = 0
  , earnMoeny = Number($("#totalEarning").attr("data"))
  , changeEarnMoney = 0
  , animate1 = window.setInterval(function() {
    var e = Math.round(investMoney / 30);
    investMoney >= changeInvestMoney + e ? (changeInvestMoney += e,
    $("#money_invest").html("累计成交 " + layout(changeInvestMoney))) : ($("#money_invest").html("累计成交 " + layout(investMoney)),
    clearInterval(animate1))
}, 50)
  , animate2 = window.setInterval(function() {
    var e = Math.round(earnMoeny / 30);
    earnMoeny >= changeEarnMoney + e ? (changeEarnMoney += e,
    $("#totalEarning").html("累计赚取 " + layout(changeEarnMoney))) : ($("#totalEarning").html("累计赚取 " + layout(earnMoeny)),
    clearInterval(animate2))
}, 50);
mediaAjax("index/getarticlelist/16/2/18", getNoticeHtml, $(".notice ul")),
mediaAjax("index/getarticlelist/46/4/24", getMediaHtml, $(".section8 ul")),
newAjax(),
$(document).on("mouseover", ".bid-name", function() {
    $(this).closest("h2").siblings(".bid-tips").css("opacity", "1")
}),
$(document).on("mouseleave", ".bid-name", function() {
    $(this).closest("h2").siblings(".bid-tips").css("opacity", "0")
}),
$(document).on("click", ".orderNextTime", function() {
    var e;
    e = $(this).hasClass("new") ? "high" : "short",
    $.ajax({
        type: "post",
        url: $_web_config_base_url + "index/makeappointment",
        data: {
            type: e
        },
        dataType: "json",
        success: function(e) {
            0 == e.code ? orderSuccess() : 2e3 == e.code ? quick_login.quick_login.show(function() {
                hasLoginFlag = !0,
                $(".common-PopUpWindow").remove()
            }) : 2013 == e.code ? $openThirdTipHtml() : notNewer(e.err)
        }
    })
}),
$.ajax({
    type: "post",
    url: $_web_config_base_url + "index/getprojectlist",
    data: "",
    dataType: "json",
    success: function(e) {
        user_id = e.data.user_id,
        coupons = e.data.ticketNum,
        balance = e.data.money;
        var a = '<div class="bid-section w1200 clearfix section4"><div class="acticle1"><a href="' + $_web_config_base_url + 'invest.html" class="investLink" target="_blank"><h2>机构担保</h2><p>精选项目 存货质押</p><span class="lit">每月还息，到期还本</span></a></div></div>'
          , t = '<div class="bid-section w1200 clearfix section5"><div class="acticle1"><a href="' + $_web_config_base_url + 'invest.html" class="investLink" target="_blank"><h2>稳健智选</h2><p>省心理财、权益多重保障</p><span class="lit">每月还息，到期还本</span></a></div></div>';
        e.data.flag ? ($(a).insertBefore(".sectionNew"),
        $(t).insertBefore(".sectionNew")) : ($(t).insertBefore(".sectionNew"),
        $(a).insertBefore(".sectionNew"));
        var n = getListHtml(e.data.vouch)
          , s = getListHtml(e.data.steady);
        $(".section4").append(n),
        $(".section5").append(s),
        process_animation()
    }
}),
$.ajax({
    type: "post",
    url: $_web_config_base_url + "index/getNationalCreditList",
    data: "",
    dataType: "json",
    success: function(e) {
        if (e.data.national_credit.length > 0) {
            var a = "";
            user_id = e.data.user_id,
            coupons = e.data.ticketNum,
            balance = e.data.money;
            var t = guoxin(e.data.national_credit);
            a = '<div class="acticle1"><a href="' + $_web_config_base_url + 'invest.html?type=%27national_credit%27" class="investLink" target="_blank"><h2>心安国信</h2><p>抱诚守真、心安礼德</p><span class="lit">按天计息，到期还本付息</span></a></div>' + t,
            $(".sectionNew").html(a),
            process_animation()
        }
    }
});
var hasLoginFlag = !1, thisIsShortBid = 0, start_Money, cpNumbers;
$(document).on("click", ".quick-invest", function() {
    var e = $(this)
      , a = {};
    a.invMoney = e.attr("canTender"),
    a.remainTime = e.attr("remaintime"),
    hasLoginFlag ? (a.remianMoney = $_user.money,
    a.couponNums = $_user.coupon_ticket) : (a.remianMoney = balance,
    a.couponNums = coupons),
    cpNumbers = a.couponNums,
    a.bidid = e.attr("dataid"),
    a.bidType = e.attr("isShort"),
    void 0 != a.bidType && (thisIsShortBid = 1),
    "5" == e.attr("isDay") || "3" == e.attr("isDay") ? (start_Money = 3650,
    data.coupon_ticket.err[2] = "单笔投资满" + start_Money + "元才可以用加息券") : (start_Money = 200,
    data.coupon_ticket.err[2] = "单笔投资满" + start_Money + "元才可以用加息券"),
    isLogin(a)
}),
$(document).on("click", ".loginNow", function() {
    $(".investFrame").animate({
        left: "-360px"
    }, 500),
    $(".loginFrame").animate({
        left: "0px"
    }, 500),
    quick_login.quick_login.operation(function() {
        if (hasLoginFlag = !0,
        $(".pocketMoney .labelVal").html($_user.money),
        $(".pocketMoney .loginNow").removeClass("loginNow").attr("href", $_web_config_base_url + "capital/recharge").html("立即充值"),
        $(".investMoney").removeClass(".firstlogin").val("").removeAttr("readonly"),
        $(".butts").removeClass("common-pop-disbtn").addClass("common-pop-btn").addClass("investNow"),
        cpNumbers = $_user.coupon_ticket,
        $_user.coupon_ticket > 0 && !thisIsShortBid) {
            var e = '<li><span class="labelText">用加息券</span><span class="labelVal oper"><span class="subtract">-</span><input type="text" value="' + $_user.coupon_ticket + '" class="ticket" name="interest_ticket_num"/><span class="plus">+</span><span class="couponTips"></span></span>张<span class="question">?<span class="float">加息将以现金形式随息发放</span></span></li>';
            $(".investFrame ul").append(e),
            $("#fast-invest").addClass("hasCoupon")
        }
        $(".loginFrame").animate({
            left: "360px"
        }, 500),
        $(".investFrame").animate({
            left: "0px"
        }, 500)
    })
});
var checkMoney = function(e) {
    var a = /^\d+\.?\d{0,2}$/;
    return a.test(e) ? Number(e) < 10 ? 3 : Number(e) % 10 === 0 ? 0 : 2 : 1
};
$(document).on("keyup", "#invest_money", function() {
    var e = $(this).val()
      , a = $(this).attr("bidId");
    e.length && (0 === checkInvestMoney(e) ? getIncome(e, a, function(e) {
        $("#fast-invest .usualtips").html(5 == e.payment_options ? "每日利息：" + e.all.day_interest + "元" : "预期收益" + e.all.interest_total + "元")
    }) : $("#fast-invest .usualtips").html("10元/份，请填写10的整数倍"))
}).on("blur", "#invest_money", function(e) {
    return $(this).prop("readonly") ? !1 : (checkInvMoney(),
    e.preventDefault())
}).on("focus", "#invest_money", function(e) {
    return hideErrTips(),
    e.preventDefault()
}),
$(document).on("click", ".investNow", function() {
    if (checkInvMoney(),
    checkCoupon(),
    checkCanSubmit()) {
        var e = $("#invest_form");
        e.submit()
    }
}),
$(document).on("keypress", "#invest_money", function(e) {
    return 13 === e.which ? ($(".investFrame .investNow").trigger("click"),
    e.preventDefault()) : void 0
}),
$(document).on("click", ".investFrame .subtract", function() {
    var e = Number($(".investFrame .ticket").val());
    e > 0 && (e--,
    $(".investFrame .ticket").val(e)),
    checkCoupon()
}),
$(document).on("click", ".investFrame .plus", function() {
    var e = Number($(".investFrame .ticket").val());
    cpNumbers > e && (e++,
    $(".investFrame .ticket").val(e)),
    checkCoupon()
}),
$(document).on("keyup", ".investFrame .ticket", function() {
    checkCoupon()
}),
$("#layer .close").on("click", function() {
    return $(this).closest("#layer").remove(),
    !1
}),
$(".popOuter .close").on("click", function() {
    return $(this).closest(".popOuter").remove(),
    !1
}),
$(document).on("click", ".bottomFooter .moreArrow", function() {
    $(this).toggleClass("moreArrowRotate"),
    $(".bottomFooter .allLink .topInfo").toggleClass("heightControl");
    var e = $("body").height()
      , a = $(window).height();
    $("html,body").animate({
        scrollTop: e - a + "px"
    }, 500)
}),
canPopSign();
