javascript: (() => {
    const rules = {
        'www.bilibili.com': {
            testReg: /^https?:\/\/www\.bilibili\.com\/video\/(av\d+).*$/i,
            replace: 'https://www.bilibili.com/$1',
            query: ['p'],
            hash: true
        },
        'itunes.apple.com': {
            testReg: /^https?:\/\/itunes\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,
            replace: 'https://itunes.apple.com/cn/$1/$2'
        },
        'apps.apple.com': {
            testReg: /^https?:\/\/apps\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,
            replace: 'https://apps.apple.com/cn/$1/$2'
        },
        'microsoft.com/win10-store': {
            testReg: /^https?:\/\/www\.microsoft\.com\/[a-zA-Z-]{2,5}\/p\/[^/]+\/([a-zA-Z0-9]{12,})(?:[^a-zA-Z0-9].*|$)/i,
            replace: 'https://www.microsoft.com/store/apps/$1'
        },
        'chrome.google.com/webstore': {
            testReg: /^https?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/i,
            replace: 'https://chrome.google.com/webstore/detail/$1'
        },
        's.taobao.com': {
            testReg: /^https?:\/\/s\.taobao\.com\/search.*$/i,
            replace: 'https://s.taobao.com/search',
            query: ['q']
        },
        'list.tmall.com': {
            testReg: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*$/i,
            replace: 'https://list.tmall.com/search_product.htm',
            query: ['q']
        },
        'item.taobao.com': {
            testReg: /^https?:\/\/item\.taobao\.com\/item\.htm.*$/i,
            replace: 'https://item.taobao.com/item.htm',
            query: ['id']
        },
        'detail.tmall.com': {
            testReg: /^https?:\/\/detail\.tmall\.com\/item\.htm.*$/i,
            replace: 'https://detail.tmall.com/item.htm',
            query: ['id']
        },
        'taobao/tmall.com/shop': {
            testReg: /^https?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*$/i,
            replace: 'https://$1.$2.com/'
        },
        'c.pc.qq.com': {
            testReg: /^https?:\/\/c\.pc\.qq\.com\/middle.html\?.*pfurl=([^&]*)(?:&.*$|$)/i,
            replace: '$1',
            query: [],
            methods: ['decodeUrl']
        },
        'item.m.jd.com': {
            testReg: /^https?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?$/i,
            replace: 'https://item.jd.com/$1.html'
        },
        'item.m.jd.com/ware/': {
            testReg: /^https?:\/\/item\.m\.jd\.com\/ware\/view\.action\?.*wareId=(\d+).*$/i,
            replace: 'https://item.jd.com/$1.html'
        },
        'search.jd.com': {
            testReg: /^https?:\/\/search\.jd\.com\/Search\?.*$/i,
            query: ['keyword', 'enc']
        },
        're.jd.com': {
            testReg: /^https?:\/\/re\.jd\.com\/cps\/item\/(\d+)\.html.*$/i,
            replace: 'https://item.jd.com/$1.html'
        },
        'weibo.com/u': {
            testReg: /^https?:\/\/(?:www\.)?weibo\.com\/u\/(\d+)(\?.*)?$/i,
            replace: 'https://m.weibo.cn/$1'
        },
        'weibo.com': {
            testReg: /^https?:\/\/(?:www\.)?weibo\.com\/(?:\d+)\/(\w+)(\?.*)?$/i,
            replace: 'https://m.weibo.cn/status/$1'
        },
        'greasyfork.org/script/tabs': {
            testReg: /^https?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/(code|versions|stats|derivatives|admin).*$/i,
            replace: 'https://greasyfork.org/scripts/$1/$2',
            hash: true
        },
        'greasyfork.org': {
            testReg: /^https?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?(scripts|users)\/(\d+)-[^//]*$/i,
            replace: 'https://greasyfork.org/$1/$2'
        },
        'greasyfork.org/scripts/list': {
            testReg: /^https?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\?.*$/i,
            query: ['set', 'page']
        },
        'greasyfork.org/script/discussions': {
            testReg: /^https?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/discussions\/(\d+).*$/i,
            replace: 'https://greasyfork.org/scripts/$1/discussions/$2',
            hash: true
        },
        'greasyfork.org/discussions': {
            testReg: /^https?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?discussions\/(greasyfork|development|requests)\/(\d+)(?:[^\d].*)?$/i,
            replace: 'https://greasyfork.org/discussions/$1/$2',
            hash: true
        },
        'store.steampowered.com|steamcommunity.com': {
            testReg: /^https?:\/\/(store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i,
            replace: 'https://$1.com/app/$2'
        },
        'meta.appinn.com': {
            testReg: /^https?:\/\/meta\.appinn\.net\/t(?:\/[^/]*)*?\/(\d+)(\/.*$|$)/i,
            replace: 'https://meta.appinn.net/t/$1'
        },
        'amazon.co.jp': {
            testReg: /^https?:\/\/(?:www\.)?amazon\.co\.jp\/([^\/]+)\/dp\/(\w+)\/.*$/i,
            replace: 'https://www.amazon.co.jp/$1/dp/$2'
        },
        'yangkeduo.com': {
            testReg: /^https?:\/\/mobile\.yangkeduo\.com\/goods.html\?.*$/i,
            query: ['goods_id']
        },
        'trello.com': {
            testReg: /^https?:\/\/(?:www\.)?trello\.com\/(\w)\/(\w+)(\/.*$|$)/i,
            replace: 'https://trello.com/$1/$2',
            hash: true
        },
        other: {
            testReg: /^(https?:\/\/[^?#]*)[?#].*$/i,
            query: ['id', 'tid', 'uid', 'q', 'wd', 'query', 'keyword', 'keywords']
        }
    };

    const copyFunc = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            const input = document.createElement('input');
            input.value = text;
            input.style.position = 'fixed';
            document.body.appendChild(input);
            input.select();
            const result = document.execCommand('copy');
            document.body.removeChild(input);
            return result;
        }
    };

    const pureUrl = ((url = window.location.href) => {
        const hash = url.replace(/^[^#]*(#.*)?$/, '$1');
        const base = url.replace(/(\?|#).*$/, '');
        let pureUrl = url;

        const getQueryString = (key) => {
            const ret = url.match(new RegExp('(?:\\?|&)(' + key + '=[^?#&]*)', 'i'));
            return ret === null ? '' : ret[1];
        };

        const methods = {
            decodeUrl: (url) => {
                return decodeURIComponent(url);
            }
        };

        for (const [domain, rule] of Object.entries(rules)) {
            if (rule.testReg.test(url)) {
                let newQuerys = '';

                if (rule.query && rule.query.length > 0) {
                    rule.query.forEach(query => {
                        const ret = getQueryString(query);
                        if (ret !== '') {
                            newQuerys += (newQuerys.length ? '&' : '?') + ret;
                        }
                    });
                }

                newQuerys += (rule.hash ? hash : '');
                pureUrl = (rule.replace === undefined ? base : url.replace(rule.testReg, rule.replace)) + newQuerys;

                if (rule.methods && rule.methods.length > 0) {
                    rule.methods.forEach(methodName => {
                        pureUrl = methods[methodName](pureUrl);
                    });
                }

                break;
            }
        }

        return pureUrl;
    })();
    try {
        copyFunc(pureUrl).then(() => {
            if (window.location.href === pureUrl) {
                window.location.reload();
            } else {
                window.location.href = pureUrl;
            }
        });

    } catch (err) {
        if (prompt('净化后的网址是：', pureUrl) !== null) {
            window.location.href = pureUrl;
        }
    }

})();