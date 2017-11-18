/**
 * @desc module urls
 */
const fs = require('fs');
const axios = require('axios');

const modules = [
    'collectionProgress',
    'payPartnerLoanMarket',
    'tradeFinancialMarketx',
    'messageActivityIndex',
    'activityTradeLottery'
];

const request = (url, params) => {
    return axios.get(url, {
        baseURL: '/api/v2/release/',
        headers: {
            'Cookie': 'passportTokenJWT=123456;'
        },
        params: params
    });
}

let data = {

};

Promise.all(modules.map(async (moduleName) => {
    // 获取模块下载链接
    data[moduleName] = await request('/show', {
        keyword: moduleName,
        env: 'prod',
        type: 'hybrid',
        page: 1,
        appID: 0
    }).then(res => {
        return Promise.all(res.data.data.list.map(item => {
            return request('/getReleaseSetDetail', {
                id: item._id,
                appID: 0
            }).then(ret => ret.data.data.subReleases[0].fileUrl);
        }));
    });
    return true;
})).then(res => {
    fs.writeFileSync('online.json', JSON.stringify(data));
});
