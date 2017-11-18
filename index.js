const download = require('download');
const diff_match_patch = require('./diff_match_patch');

const urls = require('./online.json');

Promise.all(Object.keys(urls).map(async (key) => {
    let ret = await Promise.all(urls[key].map((url, index) => download(url, `tmp/${key}-${index}`, {
        extract: true
    })));
    return true;
})).then(res => {
    console.log('success');
});