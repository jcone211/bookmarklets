javascript: (() => {
    const l0 = document.querySelector(".left-container.scroll-sticky");
    const l1_title = document.getElementById("viewbox_report");
    const l2_watch_msg = document.querySelector(".bpx-player-video-info");
    const l3_send_barrage = document.querySelector(".bpx-player-video-inputbar");
    const l4_v_praise_msg1 = document.querySelector(".video-toolbar-left");
    const l4_v_praise_msg2 = document.querySelector(".video-toolbar-right");
    const l5_v_detail = document.getElementById("v_desc");
    const l6_v_tags = document.querySelector(".video-tag-container");
    const l7_ad1 = document.querySelector(".inside-wrp");
    const l7_ad2 = document.querySelector(".ad-report.ad-floor-exp.left-banner");
    const l8_toolbar_divide = document.getElementById("arc_toolbar_report");

    const r0 = document.querySelector(".right-container");
    const r1_up_msg = document.getElementById("danmukuBox");
    const r1_up_msg_2 = document.querySelector(".up-panel-container");
    const r2_barrage = document.querySelector(".bui-collapse-header");
    const r3_ad1 = document.getElementById("slide_ad");
    const r3_ad2 = document.querySelector(".video-card-ad-small");
    const r4_v_list = document.querySelector(".rcmd-tab");
    const r4_v_list_body = document.querySelector(".video-pod__body");
    const r5_rec_list = document.querySelector(".recommend-list-v1");
    const r6_ad = document.querySelector(".ad-report.ad-floor-exp.right-bottom-banner");
    if (l8_toolbar_divide) {
        l8_toolbar_divide.style.margin = "100px 0";
    }
    if (r4_v_list) {
        r4_v_list.style.marginTop = "105px";
    }
    if (r4_v_list_body) {
        r4_v_list_body.style.maxHeight = "600px";
    } else {
        if (l0) {
            l0.style.margin = "0 auto";
        }
        if (r0) {
            r0.style.display = 'none';
        }
    }
    const elementsToHide = [
        l2_watch_msg,
        l3_send_barrage,
        l4_v_praise_msg1,
        l4_v_praise_msg2,
        l5_v_detail,
        l6_v_tags,
        l7_ad1,
        l7_ad2,
        r1_up_msg,
        r1_up_msg_2,
        r2_barrage,
        r3_ad1,
        r3_ad2,
        r5_rec_list,
        r6_ad
    ];
    elementsToHide.forEach(element => {
        if (element) {
            element.style.display = 'none';
        }
    });
})();