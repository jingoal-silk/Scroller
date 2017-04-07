/**
 * @file index.js
 * @author houyl@jingoal.com
 *
 * 多语言处理
 */

/* eslint-disable camelcase */
import zh_CN from './zh_CN.json';
import zh_TW from './zh_TW.json';
import en_US from './en_US.json';


const LANGUAGE = 'zh';

export function getMessage(key, lang = LANGUAGE) {
    if (lang === 'zh' || lang === 'zh_CN') {
        return key ? zh_CN[key] : zh_CN
    } else if (lang === 'zh-Hant' || lang === 'zh_TW') {
        return key ? zh_TW[key] : zh_TW
    } else if (lang === 'en' || lang === 'en_US') {
        return key ? en_US[key] : en_US;
    }
    return null;
}

export function getLocale(key, lang = LANGUAGE) {
    if (lang === 'zh' || lang === 'zh_CN') {
        return {
            lang: 'zh',
            messages: key ? zh_CN[key] : zh_CN
        }
    } else if (lang === 'zh-Hant' || lang === 'zh_TW') {
        return {
            lang: 'zh-Hant',
            messages: key ? zh_TW[key] : zh_TW
        }
    } else if (lang === 'en' || lang === 'en_US') {
        return {
            lang: 'en',
            messages: key ? en_US[key] : en_US
        };
    }
    return null;
}

